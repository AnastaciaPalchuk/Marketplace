import { z } from "zod";

const createItem = z.object ({
    itemName: z.string(),
    categoryId: z.string(),
    count: z.number().int().nonnegative()
});

const createCategory = z.object ({
    categoryName: z.string()
});

const deleteItem = z.object({
    itemId: z.number().int().nonnegative()
});

const changeCount = z.object({
    count: z.number().int().nonnegative(),
    itemId: z.number().int().nonnegative()
});

const changePrice = z.object({
    price: z.number().int().nonnegative(),
    itemId: z.number().int().nonnegative()
})

export = {createItem,createCategory, deleteItem, changeCount, changePrice};