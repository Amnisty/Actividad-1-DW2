"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config"));
//ROUTERS
const routes_1 = require("./routes");
const app = (0, express_1.default)();
//CONFIG
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/static", express_1.default.static(path_1.default.join(__dirname, "../public")));
//ROUTES
app.use("/api", routes_1.basicRouter);
//LISTEN
app.listen(config_1.default.PORT, () => {
    console.log("App listen on port " + config_1.default.PORT);
});
