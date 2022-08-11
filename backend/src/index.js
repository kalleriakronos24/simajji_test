import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cluster from 'cluster';
require('dotenv').config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Routes from './server/routes/index';
import csurf from 'csurf';

// process.on('unhandledRejection', (rejectionErr) => {
//     // won't execute
//     console.log('unhandledRejection Err::', rejectionErr);
//     console.log('unhandledRejection Stack::', JSON.stringify(rejectionErr))
// })

// process.on('uncaughtException', (uncaughtExc) => {
//     console.log('uncaughtException Err::', uncaughtExc);
//     console.log('uncaughtException Stack::', JSON.stringify(uncaughtExc));
// })

const app = express();
let workers = [];


class App extends Routes {
    constructor() {
        super()
    }

    /**
    * Setup number of worker processes to share port which will be defined while setting up the server
    */

    setupWorkerProcesses() {
        // to read number of cores on system

        let numCores = require('os').cpus().length;
        console.log('Master cluster setting up ' + numCores + ' workers');

        // iterate on number of cores need to be utilized by an application
        // current example will utilize all of them

        for (let i = 0; i < numCores; i++) {
            // creating workers and pushing reference in an array
            // these references can be used to receive messages from workers

            workers.push(cluster.fork());

            //to receive messages from worker process

            workers[i].on('message', (msg) => {
                console.log(msg)
            })

        }

        // process is clustered on a core and process id is assigned
        cluster.on('online', (worker) => {
            console.log('Worker ' + worker.process.pid + ' is listening')
        })

        // if any of the worker process dies then start a new one by simply forking another one
        cluster.on('exit', (worker, code, signal) => {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            workers.push(cluster.fork());
            // to receive messages from worker process
            workers[workers.length - 1].on('message', function (message) {
                console.log(message);
            });
        })
    }

    /**
    * Setup an express server and define port to listen all incoming requests for this application
    */

    setUpExpress() {
        // create server
        app.server = http.createServer(app);

        // logger

        // sockets
        // this.setUpSockets(app.server);

        // parse application/json
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }))
        app.disable('x-powered-by')

        // routes
        app.use('/api/v1', super.route())

        // cookie parser and CSRF Middleware
        app.use(cookieParser());
        // app.use(csurf({ cookie : true }));
        
        // cross origin configuration
        app.use(cors());
        
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            if (req.method == 'OPTIONS') {
                return res.sendStatus(200);
            }

            next();
        });



        app.use('/public', express.static('./public'));

        // start server
        app.server.listen('8000', () => {
            console.log(`Started server on => http://localhost:${app.server.address().port} for Process Id ${process.pid}`);
        });



        // in case of an error
        app.on('error', (appErr, appCtx) => {
            console.error('app error', appErr.stack);
            console.error('on url', appCtx.req.url);
            console.error('with headers', appCtx.req.headers);
        });
    }


    /**
     * this function is to start cron job and running every second
     * every task of cronjob is goes to here
     */
    setUpCronJob() {

        // (new CronJob('* * * * * *', () => {

        //     // tasks

        //     // const Order = OrderSchema;

        //     // Order.find({}, (err,res) => {

        //     //     if(res){

        //     //         return res.map((v,i) => {

        //     //             // check wheter all the item of order status is true
        //     //             let check = v.item.every((x,y) => x.status === true);



        //     //         })

        //     //     }

        //     // })




        // }, null, true, 'Asia/Makassar')).start();
    }

    setUpSockets(port) {

        // define the endpoint socket; 

        const io = socketIo(app.server, {
            transports: ['websocket']
        });


        // create the socket
        io.on('connection', (socket) => {

            const updateStatus = (id, bool, socket_id) => new UserController().setStatusUserToOnline(id, bool, socket_id)
            const emitOrderToCourier = (token) => new SocketController().getCurrentOrderCourier(token);

            socket.on('userConnected', (token) => {

                if (token !== undefined || token !== null || token !== "") {
                    socket._id = token;
                    console.log(token + ' connected');
                    updateStatus(token, true, socket.id);
                } else {
                    console.log('token invalid, return');
                }
            });


            // fired up when the user disconnected
            socket.on('disconnect', () => {
                console.log('someone disconnected');
                if (socket._id) {
                    console.log(socket._id + ' disconnected');
                    updateStatus(socket._id, false, socket.id);
                }
            })
        })
    };



    /**
     * Setup server either with clustering or without it
     * @param isClusterRequired Boolean
     * @constructor
     */

    setupServer(isClusterRequired) {

        // if it is a master process then call setting up worker process
        if (isClusterRequired && cluster.isMaster) {
            this.setupWorkerProcesses();
        } else {
            // to setup server configurations and share port address for incoming requests
            this.setUpExpress();
        }
    }
}





// run the server
new App().setupServer(process.env.NODE_ENV === "test" ? false : true);
const app_url = 'http://localhost:8000';

// export the app (incase for testing purposes)
export {
    app_url
}