import Constants = require("./../../config/constants/constants");
import crypto    = require('crypto');

class Hash {

    static hashPassword(password: string): string {
        return crypto.createHash('md5')
            .update(password + Constants.MD5_SALT)
            .digest('hex');
    }
}

export = Hash;