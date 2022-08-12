import AuthController from './auth.controllers';
import CartController from './cart.controllers';
import ItemsController from './items.controllers';
import OrderController from './order.controller';


class Controller {

    /**
     * Authentication Controller
     */
    authController() {
        return new AuthController();
    }
    
    itemsController() {
        return new ItemsController()
    }

    cartController() {
        return new CartController()
    }

    orderController(){
        return new OrderController()
    }
};


export default Controller;