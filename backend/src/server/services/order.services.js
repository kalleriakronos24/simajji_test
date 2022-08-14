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
		this.cart = new Model().cart();
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
		const cartIds = body.cartIds;
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
		};

		const check = await this.checkIfExist({
			totalPrice,
			paymentMethod,
			shippingAddress,
			isSuccessTransaction,
			userId,
		});

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

		try {
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

			// after creating new order, we delete the cart contents
			for (const cartId of cartIds) {
				const cartItem = await this.cart.destroy({
					where: {
						id: cartId,
					},
				});

				console.log(`--- finished delete cart id ${cartItem} ---`);
			}

			this.util.setSuccess(200, 'New Order is Created!', newOrder);
			this.util.send(res);
			return;
		} catch (err) {
			this.util.setError(403, 'Failed to create new Order', {
				data: err,
			});
			this.util.send(res);
			return;
		}
	}

	async getOrderByUserId(res, req) {
		try {
			const data = await this.order.findOne({
				where: {
					userId: req.userId,
				},
				raw: true,
				include : ['users']
			});

			this.util.setSuccess(200, 'Success get order data', data);
			this.util.send(res);
		} catch (err) {
			this.util.setError(401, 'Failed to get order data', {
				reason: err.message,
			});
			this.util.send(res);
			return;
		}
	}

	async getOrderCount(response, body) {
		try {
			const data = await this.order.count({
				col: 'userId',
				where: {
					userId: body.userId,
				},
			});

			this.util.setSuccess(200, 'Success get count of order', {
				count: data,
			});
			this.util.send(response);
		} catch (err) {
			this.util.setError(401, 'Failed to get count of order', {
				reason: err.message,
			});
			this.util.send(response);
			return;
		}
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
