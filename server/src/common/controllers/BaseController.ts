import express = require("express");

class BaseController {

    static sendValidationErrors(res: express.Response, errors): void {
        res.status(400).send({"validationErrors": errors});
    }
}
export = BaseController;