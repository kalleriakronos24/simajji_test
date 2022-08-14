import database from '../../core/models/index';


class Model {

    /**
     * @description Cart | Cart Model
     */
    cart() {
        return database.Cart
    }

    /**
     * @description Users | User Model
     */
    user() {
        return database.User
    }

    auth() {
        return database.Auth
    }

    items() {
        return database.Items
    }

    orders() {
        return database.Order
    }

    orderDetails() {
        return database.OrderDetails
    }

    transaction(){
        return database.Transactions
    }

}

export default Model;