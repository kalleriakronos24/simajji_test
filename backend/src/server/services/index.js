import AuthService from './auth.services';
import JwtService from './jwt.services';


class Service {
    authService() {
        return new AuthService();
    };
    jwtService() {
        return new JwtService();
    }
};

export default Service;