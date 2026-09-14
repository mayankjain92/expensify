import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbconnect = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error("mongoDb url not found");
    }
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1);
  }
};

export default dbconnect;
