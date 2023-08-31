import mongoose, { Schema } from "mongoose"

const reviewSchema = new Schema({
    UID: {type: String, required: true},
    rating: {type: Number, max: 10, min: 0},
    content: String,
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {type: Date, default: Date.now()},
    isDeleted: {type: Boolean, default: false},
})

export const ReviewModel = mongoose.model('Review', reviewSchema)