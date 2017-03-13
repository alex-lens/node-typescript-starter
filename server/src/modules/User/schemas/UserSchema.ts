import DataAccess = require('../../../common/dataAccess/DataAccess');
import IHeroModel = require("../interfaces/UserModelInterface");

const mongoose           = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {

    static get schema () {
        let schema =  mongoose.Schema({
            firstName : {
                type: String,
                required: true
            },
            lastName : {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
            },
            created: {
                type: Date,
                required: false
            }
        });

        schema.path('email').validate(function(value, done) {
            this.model('Users').count({ email: value }, function(err, count) {
                if (err) {
                    return done(err);
                }
                done(!count);
            });
        }, 'Email already exists');

        return schema;
    }
}
var schema = mongooseConnection.model<IHeroModel>("Users", UserSchema.schema);
export = schema;