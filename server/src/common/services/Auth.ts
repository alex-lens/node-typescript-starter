import jwt            = require('jsonwebtoken');
import passport       = require('passport');
import express        = require('express');
const BearerStrategy  = require('passport-http-bearer').Strategy;
const LocalStrategy   = require('passport-local').Strategy;
import UserRepository = require("./../../modules/User/repositories/UserRepository");
import Constants      = require("./../../config/constants/constants");

const app             = express();

class Auth {

    constructor () {
        app.use(passport.initialize());
        passport.use(new LocalStrategy(function(username, password, done) {
            const User = new UserRepository();
            User.findOne({ email: username, password: password}, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                return done(null, user);
            });
        }));
        passport.use(new BearerStrategy(function (token, done) {
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

    public isAuthenticated(req: express.Request, res, next) {
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

    public loginHandler(req, res, next) {
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

}

export = new Auth;