import express            = require("express");
import UserRepository     = require("../repositories/UserRepository");
import UserModel          = require("../schemas/UserSchema");

class UserController {

    update(req: express.Request, res: express.Response): void {
        try {
            let User = new UserModel(req.body);
            const _id = req.params._id;
            const userRepository = new UserRepository();
            userRepository.update(_id, User, (error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {
                    res.send({"success": "success"});
                }
            });
        } catch (e) {
            res.send({"error": "error in your request"});
        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            const userRepository = new UserRepository();
            userRepository.retrieve((error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            res.send({"error": "error in your request"});

        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            let _id: string      = req.params._id;
            const userRepository = new UserRepository();
            userRepository.findById(_id, (error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            res.send({"error": "error in your request"});
        }
    }
}
export = UserController;