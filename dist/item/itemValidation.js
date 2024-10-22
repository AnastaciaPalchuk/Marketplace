"use strict";
const zod_1 = require("zod");
const createItem = zod_1.z.object({
    itemName: zod_1.z.string(),
    categoryId: zod_1.z.string(),
    count: zod_1.z.number().int().nonnegative()
});
const createCategory = zod_1.z.object({
    categoryName: zod_1.z.string()
});
const deleteItem = zod_1.z.object({
    itemId: zod_1.z.number().int().nonnegative()
});
const changeCount = zod_1.z.object({
    count: zod_1.z.number().int().nonnegative(),
    itemId: zod_1.z.number().int().nonnegative()
});
const changePrice = zod_1.z.object({
    price: zod_1.z.number().int().nonnegative(),
    itemId: zod_1.z.number().int().nonnegative()
});
module.exports = { createItem, createCategory, deleteItem, changeCount, changePrice };
