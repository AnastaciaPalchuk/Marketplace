"use strict";
module.exports = (ctx, next) => {
    console.log(ctx.request);
    return next();
};
