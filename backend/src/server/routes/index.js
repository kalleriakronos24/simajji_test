import AuthRoutes from './auth.routes';
import CartRoutes from './cart.routes';
import ItemsRoutes from './items.routes';
import OrderRoutes from './order.routes';

class Routes {
    route(){
        return [
            new AuthRoutes().route(),
            new ItemsRoutes().route(),
            new CartRoutes().route(),
            new OrderRoutes().route()
        ]
    };
};


export default Routes;