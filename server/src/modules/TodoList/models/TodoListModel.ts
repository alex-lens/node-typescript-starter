import TodoListModelInterface = require('../interfaces/TodoListModelInterface');

class TodoListModel {

    private _userModel: TodoListModelInterface;

    constructor(TodoListModel: TodoListModelInterface) {
        this._userModel = TodoListModel;
    }

    get title (): string {
        return this._userModel.title;
    }
}
Object.seal(TodoListModel);
export =  TodoListModel;