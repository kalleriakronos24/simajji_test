import { Router } from 'express';
import Controller from '../controllers/index';


class OrderRoutes extends Controller {
    constructor(){
        super();
        this.router = Router();
    }

    route(){
        return [
            this.router.post('/order/add-new', super.orderController().addNewOrder),
            this.router.get('/order/count/:userId', super.orderController().getOrderCount),
            this.router.get('/order/:userId', super.orderController().getOrderByUserId),
        ]
    }
};


export default OrderRoutes;