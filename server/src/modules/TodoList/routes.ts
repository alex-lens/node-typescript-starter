import express        = require("express");
import TodoListController = require("./controllers/TodoListController");

let router = express.Router();
class UserRoutes {
    private todoListController: TodoListController;

    constructor () {
        this.todoListController = new TodoListController();
    }
    get routes () {
        const controller = this.todoListController;

        router.get("/", controller.retrieve);
        router.put("/:_id", controller.update);
        router.get("/:_id", controller.findById);
        router.post("/", controller.create);

        return router;
    }


}

Object.freeze(UserRoutes);
export = UserRoutes;