import AuthRoutes from './auth.routes';

class Routes {
    route(){
        return [
            new AuthRoutes().route()
        ]
    };
};


export default Routes;