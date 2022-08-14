import auth from '../../core/models/auth';
import Service from '../services/index';

class TransactionController extends Service {
	constructor() {
		super();
	}

	async makeTransaction(req, res) {
		const transaction = super.transactionService();
		const body = req.body;
		return await transaction.makeTransaction(res, body);
	}

}

export default TransactionController;
