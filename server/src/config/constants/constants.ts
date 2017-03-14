require('dotenv').config();

class Constants {
    static DB_CONNECTION_STRING: string = process.env.DB_URI;
    static JWT_SECRET: string           = process.env.JWT_SECRET;
    static MD5_SALT: string             = process.env.MD5_SALT;
    static PORT: number                 = process.env.PORT;
    static ENV: string                  = process.env.NODE_ENV;
}

Object.seal(Constants);
export = Constants;