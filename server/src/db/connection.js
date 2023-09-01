import mongoose from "mongoose";

export async function connectDB () {
    await mongoose.connect(process.env.MONGODB_CONNECTION)
        .then(() => console.log(`DB Connected Successfully`))
        .catch(err => console.log(err))
}