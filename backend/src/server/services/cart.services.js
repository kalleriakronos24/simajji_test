import { sequelize, Sequelize } from '../../core/models';
import Model from '../models/index';
import Util from '../utils/customResponse';

class CartService {
	constructor() {
		this.user = new Model().user();
		this.util = new Util();
		this.cart = new Model().cart();
		this.items = new Model().items();
	}

	async addItemToCart(res, body) {
		try {
			// body
			const { itemId, qty, price, userId } = body;

			const check = await this.checkIfExist(body);

			console.log('check >> ', check);
			if (check) {
				this.util.setError(403, 'Cart data already exist in database', body);
				this.util.send(res);
				return;
			}

			const checkQty = await this.checkItemQty(itemId, res);

			if (!!checkQty) {
				const itemData = checkQty;

				if (qty > itemData.stocks) {
					this.util.setSuccess(401, 'Cannot exceed the amount of items qty', {
						data: itemData,
					});
					this.util.send(res);
					return;
				}

				const newCartItem = await this.cart.create({ ...body });
				this.util.setSuccess(200, 'Cart data created', newCartItem);
				this.util.send(res);
			}
		} catch (err) {
			this.util.setError(401, 'Failed to add Cart data', {
				reason: err.message,
			});
			this.util.send(res);
			return;
		}
	}

	async deleteItemFromCart(res, req) {
		const { id } = req.params;

		const check = await this.checkIfExist({
			id: id,
		});

		if (!check) {
			this.util.setError(401, 'Failed to get Cart item id', {
				reason: 'cart id not found',
			});
			this.util.send(res);
			return;
		}

		const data = await this.cart.destroy({
			where: {
				id: id,
			},
		});

		this.util.setSuccess(200, `Success delete cart id ${id}`, data);
		this.util.send(res);
	}

	async getAllCartItems(res, body) {
		try {
			const data = await this.cart.findAll({
				include: 'items',
			});

			this.util.setSuccess(200, 'Success get list of Cart data', data);
			this.util.send(res);
		} catch (err) {
			this.util.setError(401, 'Failed to get list of Cart data', {
				reason: err.message,
			});
			this.util.send(res);
			return;
		}
	}

	async getCartCount(response, body) {
		try {
			const data = await this.cart.count({
				col: 'userId',
				where : {
					userId : body.userId
				}
			});

			this.util.setSuccess(200, 'Success get count of cart items', {
				count : data
			});
			this.util.send(response);
		} catch (err) {
			this.util.setError(401, 'Failed to get count of cart items', {
				reason: err.message,
			});
			this.util.send(response);
			return;
		}
	}

	async checkIfExist(data) {
		const check = await this.cart.findOne({ where: data, raw: true });

		let result = false;
		if (!!check) {
			result = true;
		}

		return result;
	}

	async checkItemQty(id, res) {
		try {
			const check = await this.items.findOne({
				where: {
					id: id,
				},
				raw: true,
			});
			return check;
		} catch (err) {
			this.util.setError(401, `Failed to get data item of id ${id}`, {
				reason: err.message,
			});
			this.util.send(res);
			return;
		}
	}
}

export default CartService;
