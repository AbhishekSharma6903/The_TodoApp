import mongoose from "mongoose";


export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backendAPI",
    })
    .then((c) => console.log(`Connected Database with ${c.connection.host}`))
    .catch((err) => {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1); // Exit process on failure
    });
};