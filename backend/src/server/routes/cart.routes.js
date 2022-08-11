import { Router } from 'express';
import Controller from '../controllers/index';
import { authCheck } from '../utils/jwtCheck';

class CartRoutes extends Controller {
	constructor() {
		super();
		this.router = Router();
	}

	route() {
		return [
			this.router.get('/cart/list', authCheck, super.cartController().getAllCartItems),
			this.router.get('/cart/delete/:id', super.cartController().deleteItemFromCart),
			this.router.post('/cart/add-new', super.cartController().addNewCartItem),
		];
	}
}

export default CartRoutes;
