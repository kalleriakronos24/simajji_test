import jsonwebtoken from 'jsonwebtoken';
import 'dotenv';

class JwtService {
    constructor() {
        this.jwt = jsonwebtoken
    }

    /**
     * 
     * @param {*} user Users
     * @description sign the user to get the JwtToken
     * @returns JwtToken
     */
    signInToken(user) {

        const token = this.jwt.sign(user, process.env.JWT_SECRET, { expiresIn : '360d',  });

        return token;
    };

};


export default JwtService;