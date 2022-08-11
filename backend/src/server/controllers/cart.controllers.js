import auth from '../../core/models/auth';
import Service from '../services/index';

class CartController extends Service {
	constructor() {
		super();
	}

	/**
	 *
	 * @param {*} req Request
	 * @param {*} res Response
	 * @description registering a user to the database via endpoint /auth/sign-up with all the data provided by the client
	 * @returns JwtToken if all the conditions meet
	 */
	async addNewCartItem(req, res) {
		const cart = super.cartService();
		const body = req.body;

		return await cart.addItemToCart(res, body);
	}

	async getAllCartItems(req, res) {
		const cart = super.cartService();

		return await cart.getAllCartItems(res);
	}

    async deleteItemFromCart(req,res) {
        const cart = super.cartService();

        return await cart.deleteItemFromCart(res,req);
    }
}

export default CartController;
