import jsonwebtoken from 'jsonwebtoken';
import 'dotenv';
import Model from '../models';
import Util from '../utils/customResponse';
import moment from 'moment';

class TransactionService {
	constructor() {
		this.jwt = jsonwebtoken;
		this.util = new Util();
		this.transaction = new Model().transaction();
		this.order = new Model().orders();
	}

	async makeTransaction(res, body) {
		const { orderId, transferAt } = body;

		const check = await this.checkIfOrderExist(orderId);

		if (check) {
			this.util.setError(403, 'Order ID not found', body);
			this.util.send(res);
			return;
		}

		const newTransaction = await this.transaction.create({
			orderId,
			transferAt: moment(transferAt).format('YYYY-MM-DD HH:mm:ss'),
			isDoneTransfer: true,
		});

		const getOrderData = await this.order.update(
			{
				isSuccessTransaction: true,
			},
			{
				where: {
					id: orderId,
				},
			}
		);
		this.util.setSuccess(200, 'Transaction Success!', {
			data: newTransaction,
			orderData: getOrderData,
		});
		this.util.send(res);
		return;
	}

	async checkIfOrderExist(id) {
		const check = await this.transaction.findOne({
			where: {
				orderId: id,
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

export default TransactionService;
