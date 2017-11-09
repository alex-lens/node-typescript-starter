import DataAccess        = require('../../../common/services/DataAccess');
import ITodoListModel    = require('../interfaces/TodoListModelInterface');

const mongoose           = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class TodoListSchema {

    static get schema () {
        let schema =  mongoose.Schema({
            title : {
                type: String,
                required: true
            },
            ownerId : {
                type: String,
                required: true
            },
            sharedWith : {
                type: Array,
                required: false
            },
            created: {
                type: Date,
                required: false
            },
            modified    : {
                type:     Date,
                required: false
            }
        });

        schema.path('title').validate(function(value, done) {
            this.model('TodoList').count({ title: value, ownerId: this.ownerId},
                function(error, count) {
                    if (error) {
                        return done(error);
                    }
                    done(!count);
            });
        }, 'Title already exists');

        schema.pre('save', function(next) {
            if ( !this.created ) {
                this.created  = Date.now();
            } else {
                this.modified = Date.now();
            }
            next();
        });

        return schema;
    }
}
const schema = mongooseConnection.model<ITodoListModel>("TodoList", TodoListSchema.schema);
export  = schema;