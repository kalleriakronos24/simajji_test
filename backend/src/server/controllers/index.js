import AuthController from './auth.controllers';


class Controller {

    /**
     * Authentication Controller
     */
    authController() {
        return new AuthController();
    }
    
};


export default Controller;