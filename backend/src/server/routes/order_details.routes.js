import { Router } from 'express';
import Controller from '../controllers/index';


class OrderDetailsRoutes extends Controller {
    constructor(){
        super();
        this.router = Router();
    }

    route(){
        return [
            this.router.get('/order-details/list/:orderId', super.orderDetailsController().getOrderDetailLists),
        ]
    }
};


export default OrderDetailsRoutes;