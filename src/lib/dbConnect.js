const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://akshar:loAcmgqdylo3lRVu@emoshield.ssm7l.mongodb.net/?retryWrites=true&w=majority&appName=Emoshield";
console.log(process.env.MONGODB_URI)

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = dbConnect;