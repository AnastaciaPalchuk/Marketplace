"use strict";
module.exports = (schema) => {
    return function (ctx, next) {
        schema.parse(ctx.request.body);
        return next();
    };
};
