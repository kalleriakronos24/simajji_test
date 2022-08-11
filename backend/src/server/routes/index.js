import AuthRoutes from './auth.routes';
import CartRoutes from './cart.routes';
import ItemsRoutes from './items.routes';

class Routes {
    route(){
        return [
            new AuthRoutes().route(),
            new ItemsRoutes().route(),
            new CartRoutes().route()
        ]
    };
};


export default Routes;