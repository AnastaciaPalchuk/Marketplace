"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const process_1 = require("process");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
module.exports = {
    server: {
        port: process_1.env.WEB_PORT,
    },
    database: {
        username: process_1.env.DATABASE_USERNAME,
        password: process_1.env.DATABASE_PASSWORD,
        database_name: process_1.env.DATABASE,
        host: process_1.env.HOST,
        database_port: Number(process_1.env.DATABASE_PORT),
    },
    redis: {
        port: Number(process_1.env.REDIS_PORT),
        host: process_1.env.REDIS_HOST
    }
};
