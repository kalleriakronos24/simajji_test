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
        ]
    }
};


export default OrderRoutes;