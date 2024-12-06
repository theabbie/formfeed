import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.MONGO_URL as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

declare global {
    var mongoose: any;
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
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
