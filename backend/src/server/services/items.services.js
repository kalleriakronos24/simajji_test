import Model from '../models/index';
import Util from '../utils/customResponse';

class ItemsService {
	constructor() {
		this.user = new Model().user();
		this.util = new Util();
		this.items = new Model().items();
	}

	async addNewItems(response, body) {
		// body request
		const { name, price, ratings, stocks, userId } = body;

		const check = await this.checkIfExist(body);

		if (check) {
			this.util.setError(401, 'items data has been found in database.');
			this.util.send(response);
			return;
		}

		const newItem = await this.items.create({ ...body });

		this.util.setSuccess(201, 'Item is created!', newItem);
		this.util.send(response);
		return;
	}

	async checkIfExist(data) {
		const check = await this.items.findOne({ where: data, raw: true });

		let result = false;
		if (!check) {
			result = true;
		}

		return result;
	}
}

export default ItemsService;
