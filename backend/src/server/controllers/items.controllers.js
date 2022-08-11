import auth from '../../core/models/auth';
import Service from '../services/index';

class ItemsController extends Service {
    constructor(){
        super();
    };

    /**
     * 
     * @param {*} req Request
     * @param {*} res Response
     * @description registering a user to the database via endpoint /auth/sign-up with all the data provided by the client
     * @returns JwtToken if all the conditions meet
     */
    async addNewItems(req,res) {

        const items = super.itemsService()
        const body = req.body;

        return await items.addNewItems(res, body)
    };

};


export default ItemsController;