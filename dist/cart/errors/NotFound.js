"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
class NotFound extends Error {
    constructor() {
        super('Item is not found');
    }
}
exports.NotFound = NotFound;
