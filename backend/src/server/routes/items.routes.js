import { Router } from 'express';
import Controller from '../controllers/index';


class ItemsRoutes extends Controller {
    constructor(){
        super();
        this.router = Router();
    }

    route(){
        return [
            this.router.post('/item/add-new', super.itemsController().addNewItems),
            this.router.get('/item/list', super.itemsController().getItemsList),
        ]
    }
};


export default ItemsRoutes;