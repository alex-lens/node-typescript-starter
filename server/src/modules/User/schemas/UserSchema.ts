import DataAccess = require('../../../common/services/DataAccess');
import IHeroModel = require('../interfaces/UserModelInterface');
import Hash       = require('../../../common/services/Hash');

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

        schema.pre('save', function(next) {
            let user = this;

            // only hash the password if it has been modified (or is new)
            if (!user.isModified('password')) {
                return next();
            }

            user.password = Hash.hashPassword(user.password);

            next();
        });

        return schema;
    }
}
const schema = mongooseConnection.model<IHeroModel>("Users", UserSchema.schema);
export  = schema;