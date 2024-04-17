"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    KEY: String(process.env.APP_KEY),
    USER: String(process.env.APP_USER),
    DATABASE: String(process.env.APP_DATABASE),
    PASSWORD: String(process.env.APP_PASSWORD),
    HOST: String(process.env.APP_HOST),
    DB_PORT: Number(process.env.APP_DB_PORT),
    PORT: Number(process.env.APP_PORT),
    HASH: Number(process.env.APP_HASH_SALTS),
};
