import mongoose from "mongoose";

export async function connectDB () {
    await mongoose.connect('mongodb+srv://ahmedyousry098:ahmedyousry098@cluster0.jttw0hz.mongodb.net/')
        .then(() => console.log(`DB Connected Successfully`))
        .catch(err => console.log(err))
}