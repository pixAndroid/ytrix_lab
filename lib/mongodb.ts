import mongoose from 'mongoose';

const rawUri = process.env.MONGODB_URI;

if (!rawUri) {
  throw new Error('Please define the MONGODB_URI environment variable in .env');
}

const MONGODB_URI: string = rawUri;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.conn = null;
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
