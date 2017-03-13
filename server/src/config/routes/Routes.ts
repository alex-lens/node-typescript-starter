import path       = require('path');
import express    = require('express');
import UserRoutes = require('../../modules/User/routes');

const app = express();

class Routes {

    get routes() {
        app.use("/users",  new UserRoutes().routes);
        return app;
    }
}

export = Routes;