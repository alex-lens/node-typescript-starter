require('dotenv').config();

class Constants {
    static DB_CONNECTION_STRING: string = process.env.DB_URI;
    static JWT_SECRET: string           = process.env.JWT_SECRET;
    static PORT: number                 = process.env.PORT;
    static ENV: string                  = process.env.NODE_ENV;
}

Object.seal(Constants);
export = Constants;