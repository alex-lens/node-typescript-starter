import TodoListModel          = require("../models/TodoListModel");
import UserSchema         = require("../schemas/TodoListSchema");
import RepositoryBase     = require("../../../common/repository/BaseRepository");
import TodoListModelInterface = require("../interfaces/TodoListModelInterface");

class TodoListRepository  extends RepositoryBase<TodoListModelInterface> {
    constructor () {
        super(UserSchema);
    }
}

Object.seal(TodoListRepository);
export = TodoListRepository;