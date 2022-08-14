import Model from '../models';
import Util from '../utils/customResponse';
import moment from 'moment';
import { uid } from 'uid';
class OrderService {
	constructor() {
		this.user = new Model().user();
		this.order = new Model().orders();
		this.util = new Util();
		this.orderDetails = new Model().orderDetails();
	}

	async addNewOrder(res, body) {
		const {
			transactionId,
			totalPrice,
			paymentMethod,
			shippingAddress,
			isSuccessTransaction,
			orderAt,
			userId,
		} = body;

		// array of cart items ids
		const cartItems = body.cartItems || [];
		const _orderAt = moment(orderAt).format('YYYY-MM-DD HH:mm:ss');
		const trxId = `${moment(orderAt).format('DD/MM/YY')}/${uid(
			6
		).toLocaleUpperCase()}/${moment(orderAt).format('HH')}/${moment(orderAt).format('MM')}/T`;
		const modelData = {
			transactionId: trxId,
			totalPrice,
			paymentMethod,
			shippingAddress,
			isSuccessTransaction,
			userId,
			orderAt: _orderAt,
		}
		
		const check = await this.checkIfExist(modelData);

		if (check) {
			this.util.setError(403, 'Order is already exist..', body);
			this.util.send(res);
			return;
		}

		if (cartItems && cartItems.length <= 0) {
			this.util.setError(403, 'Cart items cant be empty', body);
			this.util.send(res);
			return;
		}

		const newOrder = await this.order.create({
			transactionId: trxId,
			totalPrice,
			paymentMethod,
			shippingAddress,
			isSuccessTransaction,
			userId,
			orderAt: _orderAt,
		});

		// create the order details
		for (const cartItemId of cartItems) {
			const newOrderDetails = await this.orderDetails.create({
				orderId: newOrder.id,
				itemId: cartItemId,
				userId: userId,
			});
			console.log(
				`--- created order details id : ${newOrderDetails.id} of item id ${newOrderDetails.itemId} ---`
			);
		}

		this.util.setSuccess(200, 'New Order is Created!', newOrder);
		this.util.send(res);
	}

	async checkIfExist(data) {
		const check = await this.order.findOne({ where: data, raw: true });

		let result = false;
		if (!!check) {
			result = true;
		}

		return result;
	}
}

export default OrderService;
