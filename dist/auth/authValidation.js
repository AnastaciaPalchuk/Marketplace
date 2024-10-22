"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const passwordSchema = zod_1.z
    .string()
    .min(8, "Пароль має бути не менше 8 символів")
    .max(20, "Пароль має бути не більше 20 символів");
const UserSignUp = zod_1.z.object({
    name: zod_1.z.string(),
    surname: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: passwordSchema,
});
const UserSignIn = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: passwordSchema,
});
exports.default = { UserSignIn, UserSignUp };
