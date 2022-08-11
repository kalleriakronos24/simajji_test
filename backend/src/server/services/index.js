import AuthService from './auth.services';
import CartService from './cart.services';
import ItemsService from './items.services';
import JwtService from './jwt.services';


class Service {
    authService() {
        return new AuthService();
    };
    jwtService() {
        return new JwtService();
    }
    itemsService(){
        return new ItemsService()
    }
    cartService() {
        return new CartService()
    }
};

export default Service;