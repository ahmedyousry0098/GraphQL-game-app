import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
    UID: {type: String, required: true},
    name: String,
    isVerified: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now()}
})

export const UserModel = mongoose.model('User', userSchema)