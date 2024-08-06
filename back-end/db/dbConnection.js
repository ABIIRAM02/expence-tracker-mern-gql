
import mongoose from "mongoose";

export const dbConnection = async () => {

    try {
        const mongooseConnection = await mongoose.connect(process.env.MONGO_URI)
        console.log(` MongoDb Connected @ ${mongooseConnection.connection.host}`);

    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }

}