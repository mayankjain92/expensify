import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("MongoDB Connection Error: ", error)
        process.exit(1)
    }
}

export default dbconnect;