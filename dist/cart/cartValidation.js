"use strict";
const zod_1 = require("zod");
const addItem = zod_1.z.object({
    itemId: zod_1.z.number().int().nonnegative(),
});
const deleteFromCart = zod_1.z.object({
    itemId: zod_1.z.number().int().nonnegative(),
});
const getCart = zod_1.z.object({});
module.exports = { addItem, deleteFromCart, getCart };
