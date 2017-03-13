import express            = require("express");
import IAPIController     = require("../../../common/interfaces/APIController");
import UserModelInterface = require("../interfaces/UserModelInterface");
import UserRepository     = require("../repositories/UserRepository");
import UserModel          = require("../schemas/UserSchema");

class UserController implements IAPIController {

    create(req: express.Request, res: express.Response): void {
        try {
            let User = new UserModel(req.body);
            User.validateSync();
            if (!User.errors) {
                const userRepository = new UserRepository();
                userRepository.create(User, (error, data) => {
                    if (error) {
                        res.status(400).send({"validationErrors": error.errors});
                    } else {
                        res.send({"success": "created " + data._id});
                    }
                });
            } else {
                res.status(400).send({"validationErrors": User.errors});
            }
        } catch (e) {
            console.log(e);
            res.status(400).send({"error": "error in your request"});
        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            let user: UserModelInterface = <UserModelInterface>req.body;
            var _id = req.params._id;
            var userRepository = new UserRepository();
            userRepository.update(_id, user, (error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {
                    res.send({"success": "success"});
                }
            });
        } catch (e) {
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }

    delete(req: express.Request, res: express.Response): void {
        try {

            let _id: string = req.params._id;
            const userRepository = new UserRepository();
            userRepository.delete(_id, (error, result) => {
                if (error) {
                    res.send({"error": "error"});
                } else {
                    res.send({"success": "success"});
                }
            });
        } catch (e) {
            console.log(e);
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
            console.log(e);
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
            console.log(e);
            res.send({"error": "error in your request"});

        }
    }
}
export = UserController;