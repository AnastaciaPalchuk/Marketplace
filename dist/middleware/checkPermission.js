"use strict";
const NoAccess_1 = require("../item/errors/NoAccess");
module.exports = (ctx, next) => {
    if (ctx.access === "ADMIN") {
        return next();
    }
    else {
        const err = new NoAccess_1.NoAccess();
        ctx.status = 403;
        ctx.body = err.message;
        return;
    }
};
