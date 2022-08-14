import AuthRoutes from './auth.routes';
import CartRoutes from './cart.routes';
import ItemsRoutes from './items.routes';
import OrderRoutes from './order.routes';
import OrderDetailsRoutes from './order_details.routes';
import TransactionRoutes from './transaction.routes';

class Routes {
    route(){
        return [
            new AuthRoutes().route(),
            new ItemsRoutes().route(),
            new CartRoutes().route(),
            new OrderRoutes().route(),
            new TransactionRoutes().route(),
            new OrderDetailsRoutes().route()
        ]
    };
};


export default Routes;