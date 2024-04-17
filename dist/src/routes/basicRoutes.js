"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.basicRouter = (0, express_1.Router)();
exports.basicRouter.get("/", controllers_1.getFormController);
exports.basicRouter.post("/user", controllers_1.createNewRegister);
