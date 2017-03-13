import UserModel          = require("../models/UserModel");
import UserSchema         = require("../schemas/UserSchema");
import RepositoryBase     = require("../../../common/repository/BaseRepository");
import UserModelInterface = require("../interfaces/UserModelInterface");

class UserRepository  extends RepositoryBase<UserModelInterface> {
    constructor () {
        super(UserSchema);
    }
}

Object.seal(UserRepository);
export = UserRepository;