import mongoose = require("mongoose");

interface UserModelInterface extends mongoose.Document {
    firstName: string;
    lastName:  string;
    email:     string;
}

export = UserModelInterface;