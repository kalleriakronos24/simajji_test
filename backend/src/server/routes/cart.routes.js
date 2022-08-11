import { Router } from 'express';
import Controller from '../controllers/index';


class CartRoutes extends Controller {
    constructor(){
        super();
        this.router = Router();
    }

    route(){
        return [
            this.router.get('/cart/list', super.cartController().getAllCartItems),
            this.router.post('/cart/add-new', super.cartController().addNewCartItem),
        ]
    }
};


export default CartRoutes;