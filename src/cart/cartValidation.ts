import { z } from "zod";

const addItem = z.object ({
    itemId: z.number().int().nonnegative(),
});

const deleteFromCart = z.object({
    itemId: z.number().int().nonnegative(),
});

const getCart = z.object({
});

export = {addItem, deleteFromCart, getCart};