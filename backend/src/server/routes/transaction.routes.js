import { Router } from 'express';
import Controller from '../controllers/index';


class TransactionRoutes extends Controller {
    constructor(){
        super();
        this.router = Router();
    }
    route(){
        return [
            this.router.post('/transaction/add-new', super.transactionController().makeTransaction),
        ]
    }
};


export default TransactionRoutes;