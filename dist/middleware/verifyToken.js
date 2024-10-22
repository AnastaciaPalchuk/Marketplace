"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
module.exports = (ctx, next) => {
    const token = ctx.headers.authorization;
    const decoded = jsonwebtoken_1.default.verify(token, 'secret');
    ctx.userId = decoded.id;
    ctx.access = decoded.access_type;
    return next();
};
