import AuthService from './auth.services';


class Service {
    authService() {
        return new AuthService();
    };
};

export default Service;