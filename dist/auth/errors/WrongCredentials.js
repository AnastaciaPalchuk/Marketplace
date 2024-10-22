"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongCredentials = void 0;
class WrongCredentials extends Error {
    constructor() {
        super('WrongCredentials');
    }
}
exports.WrongCredentials = WrongCredentials;
