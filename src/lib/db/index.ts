import mongoose from 'mongoose'

// Database connection utilities
export { default as connectDB, default as getDbConnection } from './mongoose'

export async function closeDbConnection() {
  await mongoose.connection.close()
}

