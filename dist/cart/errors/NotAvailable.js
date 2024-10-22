"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAvailable = void 0;
class NotAvailable extends Error {
    constructor() {
        super('Item is not available');
    }
}
exports.NotAvailable = NotAvailable;
