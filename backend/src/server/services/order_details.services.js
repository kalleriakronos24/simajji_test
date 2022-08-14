import jsonwebtoken from 'jsonwebtoken';
import 'dotenv';
import Model from '../models';
import Util from '../utils/customResponse';
import moment from 'moment';

class OrderDetailsService {
	constructor() {
		this.jwt = jsonwebtoken;
		this.util = new Util();
		this.orderDetails = new Model().orderDetails();
		this.order = new Model().orders();
	}

	async getOrderDetailList(res, body) {
		const { orderId } = body;

		const check = await this.checkIfOrderExist(orderId);

		if (!check) {
			this.util.setError(403, 'Order ID not found', body);
			this.util.send(res);
			return;
		}

		const orderDetailsData = await this.orderDetails.findAll({
			where: {
				orderId: orderId,
			},
			include: ['items'],
			raw: true,
		});

		this.util.setSuccess(200, 'Success Get Order List', orderDetailsData);
		this.util.send(res);
		return;
	}

	async checkIfOrderExist(id) {
		const check = await this.order.findOne({
			where: {
				id: id,
			},
			raw: true,
		});

		let result = false;
		if (!!check) {
			result = true;
		}

		return result;
	}
}

export default OrderDetailsService;
