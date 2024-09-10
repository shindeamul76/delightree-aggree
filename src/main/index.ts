import "module-alias/register";
import { app } from "./app"
import dotenv from 'dotenv';
import { connectDB } from "./db/connect";
import { MONGO_URI, PORT } from "./config";
dotenv.config();


const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => console.log(`server is running in port ${PORT}... `));
    } catch (error: any) {
        throw new Error(error.message)
    }
}


start();