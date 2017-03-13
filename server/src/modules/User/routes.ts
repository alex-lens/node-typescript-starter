import express        = require("express");
import UserController = require("./controllers/UserController");

let router = express.Router();
class UserRoutes {
    private userController: UserController;

    constructor () {
        this.userController = new UserController();
    }
    get routes () {
        const controller = this.userController;

        router.get("/", controller.retrieve);
        router.post("/", controller.create);
        router.put("/:_id", controller.update);
        router.get("/:_id", controller.findById);
        router.delete("/:_id", controller.delete);

        return router;
    }


}

Object.seal(UserRoutes);
export = UserRoutes;