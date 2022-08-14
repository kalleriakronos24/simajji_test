import AuthService from './auth.services';
import CartService from './cart.services';
import ItemsService from './items.services';
import JwtService from './jwt.services';
import OrderService from './order.services';
import OrderDetailsService from './order_details.services';
import TransactionService from './transaction.service';


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
    orderService() {
        return new OrderService();
    }
    orderDetailsService() {
        return new OrderDetailsService()
    }

    transactionService() {
        return new TransactionService()
    }
};

export default Service;