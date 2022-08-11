import Service from '../services/index';

class AuthController extends Service {
    constructor(){
        super();
    };

    /**
     * 
     * @param {*} req Request
     * @param {*} res Response
     * @description registering a user to the database via endpoint /auth/sign-up with all the data provided by the client
     * @returns JwtToken if all the conditions meet
     */
    async userRegister(req,res) {

        const auth = super.authService();
        const body = req.body;

        return await auth.userRegister(res, body);
    };

    /**
     * 
     * @param {*} req Request
     * @param {*} res Response
     * @description login user to the server, if all the data is valid, gives a user JwtToken to access the frontend's application
     * @returns JwtToken if all the conditions meet
     */
    async userLogin(req,res) {

        const auth = super.authService();
        const body = req.body;

        return await auth.login(res, body);
        
    }

    async setUsersCookie(req,res) {

        const auth = super.authService();
        const body = req.body;

        return await auth.setUsersCookie(req, res, body.value);
    }

    async getAllUsersToken(req,res) {
        const auth = super.authService();
        const body = req.body;

        return await auth.getAllUsersToken(req,res)
    }

    async fetchUsersCookie(req,res) {

        const auth = super.authService();
        return auth.fetchUsersCookie(req, res);
    }
};


export default AuthController;