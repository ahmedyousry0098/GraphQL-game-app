import mongoose, {Schema} from 'mongoose'

const GameSchema = new Schema({
    UID: {type: String, required: true},
    title: {type: String},
    platform: [String],
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now()},
    isDeleted: {type: Boolean, default: false},
})

export const GameModel = mongoose.model('Game', GameSchema)
