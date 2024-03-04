// @ts-ignore
import MongoStore from "rate-limit-mongo";

export const limiterConfig = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 request per 'window' (15 mins)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    store: new MongoStore({
        uri: process.env.LIMITER_URI,
        expiresTimeMs: 15 * 60 * 1000,
        errorHandler: console.error.bind(null, "rate-limit-mongo"),
    }),
};
