import AuthController from './auth.controllers';
import CartController from './cart.controllers';
import ItemsController from './items.controllers';


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
};


export default Controller;