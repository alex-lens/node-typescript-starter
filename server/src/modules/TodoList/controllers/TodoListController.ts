import express            = require("express");
import TodoListModel      = require("../schemas/TodoListSchema");
import TodoListRepository = require("../repositories/TodoListRepository");
import BaseController    = require("../../../common/controllers/BaseController");

class TodoListController extends BaseController {

    create(req: express.Request, res: express.Response): void {
        try {
            let TodoList = new TodoListModel(req.body);
            TodoList.ownerId = req.user.id;
            TodoList.validateSync();
            if (!TodoList.errors) {
                const todoListRepository = new TodoListRepository();
                todoListRepository.create(TodoList, (error, result) => {
                    return super.responseHandler(error, result, res);
                });
            } else {
                return super.sendValidationErrors(res, TodoList.errors);
            }
        } catch (e) {
            return super.sendResponseError(res, "error in your request");
        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            let User = new TodoListModel(req.body);
            const _id = req.params._id;
            const todoListRepository = new TodoListRepository();
            todoListRepository.update(_id, User, (error, result) => {
                return super.responseHandler(error, result, res);
            });
        } catch (e) {
            return super.sendResponseError(res, "error in your request");
        }
    }

    retrieve(req: express.Request, res: express.Response): void {
        try {
            const todoListRepository = new TodoListRepository();
            todoListRepository.retrieveWhereOnly({ownerId: req.user.id}, 'title created',
                (error, result) => {
                    return super.responseHandler(error, result, res);
                });
        } catch (e) {
            return super.sendResponseError(res, "error in your request");
        }
    }

    findById(req: express.Request, res: express.Response): void {
        try {
            let _id: string  = req.params._id;
            const todoListRepository = new TodoListRepository();
            todoListRepository.findOne({_id: _id, ownerId: req.user.id}, (error, result) => {
                return super.responseHandler(error, result, res);
            });
        } catch (e) {
            return super.sendResponseError(res, "error in your request");
        }
    }
}
export = TodoListController;