import mongoose = require("mongoose");

interface TodoListModelInterface extends mongoose.Document {
    title:      string;
    ownerId:    string;
    sharedWith: Array<number>;
    created:    Date;
}

export = TodoListModelInterface;