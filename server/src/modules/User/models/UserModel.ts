import UserModelInterface = require('../interfaces/UserModelInterface');

class UserModel {

    private _userModel: UserModelInterface;

    constructor(userModel: UserModelInterface) {
        this._userModel = userModel;
    }
    get fullName (): string {
        return this._userModel.firstName + ' ' + this._userModel.lastName;
    }

    get email (): string {
        return this._userModel.email;
    }
}
Object.seal(UserModel);
export =  UserModel;