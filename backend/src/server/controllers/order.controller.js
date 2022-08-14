import auth from '../../core/models/auth';
import Service from '../services/index';

class OrderController extends Service {
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
	async addNewOrder(req, res) {
		const order = super.orderService();
		const body = req.body;

		return await order.addNewOrder(res, body);
	}

	async getOrderCount(req,res) {
        const order = super.orderService()
        const body = req.params;

        return await order.getOrderCount(res, body)
    }

	async getOrderByUserId(req,res) {
		const order = super.orderService()
        const body = req.params;

        return await order.getOrderByUserId(res, body)
	}
}

export default OrderController;
