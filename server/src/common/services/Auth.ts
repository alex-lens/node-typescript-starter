import UserRepository = require('./../../modules/User/repositories/UserRepository');
import UserModel      = require("./../../modules/User/schemas/UserSchema");
import Constants      = require("./../../config/constants/constants");
import jwt            = require('jsonwebtoken');
import passport       = require('passport');
import express        = require('express');
import Hash           = require('./Hash');

const BearerStrategy  = require('passport-http-bearer').Strategy;
const LocalStrategy   = require('passport-local').Strategy;
const app             = express();

class Auth {

    constructor() {
        app.use(passport.initialize());
        passport.use(new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            (username, password, done) => {
                const User = new UserRepository();
                password   = Hash.hashPassword(password);

                User.findOne({ email: username, password: password }, function(err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }

                    return done(null, user);
                });
        }));
        passport.use(new BearerStrategy((token, done) => {
            jwt.verify(token, Constants.JWT_SECRET, function(err, decoded) {
                if (err) {
                    return done(err);
                }
                const userRepository = new UserRepository();
                userRepository.findById(decoded.id, (error, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }

                    return done(null, user ? user : false);
                });

            });
        }));
    }

    public isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
        passport.authenticate('bearer', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (user) {
                req.user = user;
                return next();
            } else {
                return res.status(401).json({status: 'error', code: 'unauthorized'});
            }
        })(req, res, next);
    }

    public signInHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({ status: 'error', code: 'unauthorized' });
            } else {
                return res.json({ token: jwt.sign({id: user.id}, Constants.JWT_SECRET) });
            }
        })(req, res, next);
    }

    public signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            let User = new UserModel(req.body);
            User.validateSync();
            if (!User.errors) {
                const userRepository = new UserRepository();
                userRepository.create(User, (error, data) => {
                    if (error) {
                        res.status(400).send({"validationErrors": error.errors});
                    } else {
                        return res.json({ token: jwt.sign({id: data._id}, Constants.JWT_SECRET) });
                    }
                });
            } else {
                res.status(400).send({"validationErrors": User.errors});
            }
        } catch (e) {
            res.status(400).send({"error": "error in your request"});
        }

    }

}

export = new Auth;