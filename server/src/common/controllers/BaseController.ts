import express = require("express");

class BaseController {

    protected sendValidationErrors(res: express.Response, errors): void {
        res.status(400).send({"validationErrors": errors});
    }

    protected sendResponseError(res: express.Response, error): void {
        res.status(400).send({"error": error});
    }

    protected responseHandler(errors, result, res) {
        if (errors) {
            if (errors.name && errors.name === "ValidationError") {
                res.status(400).send({"validationErrors": errors});
            } else {
                res.send({"error": errors});
            }
        } else if (result) {
            res.send(result);
        } else {
            res.send({"error": "Not Found"}).status(404);
        }
    }
}
export = BaseController;