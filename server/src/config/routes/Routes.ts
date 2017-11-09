import express        = require('express');
import UserRoutes     = require('../../modules/User/routes');
import TodoListRoutes = require('../../modules/TodoList/routes');

const app = express();

class Routes {

    get routes() {
        app.use("/users",  new UserRoutes().routes);
        app.use("/todo-list",  new TodoListRoutes().routes);
        return app;
    }
}

export = Routes;