import auth from '../../core/models/auth';
import Service from '../services/index';

class OrderDetailsController extends Service {
    constructor(){
        super()
    }
    
    async getOrderDetailLists(req,res) {
        const orderDetails = super.orderDetailsService()
        const body = req.params;

        return await orderDetails.getOrderDetailList(res, body)
    }

};


export default OrderDetailsController;