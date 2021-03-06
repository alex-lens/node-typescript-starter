/// <reference path="../typings/index.d.ts" />
import path         = require('path');
import express      = require('express');
import BaseRoutes   = require("./config/routes/Routes");
import bodyParser   = require("body-parser");
import cors         = require('express-cors');
import Constants    = require("./config/constants/constants");

const Auth             = require('./common/services/Auth');
const PushNotification = require('./common/services/PushNotification');
const app              = express();

app.set('port', Constants.PORT);
app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));

// for system.js to work. Can be removed if bundling.
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.static(path.resolve(__dirname, '../../node_modules')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(Constants.CORS_OPTIONS));

app.post('/signIn', Auth.signInHandler);
app.post('/signUp', Auth.signUp);
app.use('/api', Auth.isAuthenticated, new BaseRoutes().routes);

const renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
};

app.get('/*', renderIndex);

if (Constants.ENV === 'developement') {
    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}


// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

export { app }