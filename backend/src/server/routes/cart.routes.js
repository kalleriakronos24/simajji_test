import { Router } from 'express';
import Controller from '../controllers/index';

class CartRoutes extends Controller {
	constructor() {
		super();
		this.router = Router();
	}

	route() {
		return [
			this.router.get('/cart/list', super.cartController().getAllCartItems),
			this.router.get('/cart/list/user/:userId', super.cartController().getCartItemsByUserId),
			this.router.get('/cart/count/:userId', super.cartController().getCartCount),
			this.router.get('/cart/delete/:id', super.cartController().deleteItemFromCart),
			this.router.post('/cart/add-new', super.cartController().addNewCartItem),
			this.router.post('/cart/update/qty', super.cartController().updateCartQty),
		];
	}
}

export default CartRoutes;
