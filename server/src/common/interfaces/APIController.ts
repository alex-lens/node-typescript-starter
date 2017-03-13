import express = require("express");

interface IAPIController {
    retrieve: express.RequestHandler;
    findById: express.RequestHandler;
    create:   express.RequestHandler;
    update:   express.RequestHandler;
    delete:   express.RequestHandler;
}
export = IAPIController;