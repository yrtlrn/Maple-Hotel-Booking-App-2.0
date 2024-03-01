import { default as connectMongoDBSession } from "connect-mongodb-session";
import session from "express-session";

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
    uri: process.env.SESSION_URI as string,
    collection: "session",
    
});

export const sessionConfig = session({
    name: "sessCookie",
    secret: process.env.SESSION_KEY as string,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hour
        sameSite: true,
    },
});
