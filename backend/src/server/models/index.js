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

}

export default Model;