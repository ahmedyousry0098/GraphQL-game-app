import mongoose, {Schema} from 'mongoose'

const GameSchema = new Schema({
    UID: {type: String, required: true},
    title: {type: String},
    platform: [String],
    createdAt: {type: Date, default: Date.now()},
    isDeleted: {type: Boolean, default: false},
})

export const GameModel = mongoose.model('Game', GameSchema)
