"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExists = void 0;
class UserAlreadyExists extends Error {
    constructor() {
        super('User already exists');
    }
}
exports.UserAlreadyExists = UserAlreadyExists;
