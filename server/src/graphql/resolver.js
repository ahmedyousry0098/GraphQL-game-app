import { UserModel } from '../db/models/user.model.js'
import { ReviewModel } from '../db/models/review.model.js'
import { GameModel } from '../db/models/game.model.js'
import {badUserInputError, internalServerError, notFoundError, validationError} from './customErrors.graphql.js'

export const resolvers = {
    Query: {
        games: async () => {
            const games = await GameModel.find()
            if (!games) {
                return internalServerError()
            }
            if(!games.length) {
                return notFoundError(`no games found`)
            }
            return games
        },
        game: async (_, {_id}) => {
            if (!_id) {
                return validationError(`game id is required`)
            }
            const game = await GameModel.findOne({_id})
            if (!game) {
                return notFoundError(`game with id ${_id} not found`)
            }
            return game
        },
        reviews: async () => {
            const reviews = await ReviewModel.find({})
            if (!reviews) {
                return internalServerError()
            }
            if(!reviews.length) {
                return notFoundError(`no reviews found`)
            }
            return reviews
        },
        review: async (_, {_id}) => {
            if (!_id) {
                return validationError(`review id is required`)
            }
            const review = await ReviewModel.findById(_id)
            if (!review) {
                return notFoundError(`review with id ${_id} not found`)
            }
            return review
        },
        authors: async () => {
            const authors = await UserModel.find()
            if (!authors) {
                return internalServerError()
            }
            if(!authors.length) {
                return notFoundError(`no authors found`)
            }
            return authors
        },
        author: async (_, {_id}) => {
            if (!_id) {
                return validationError(`author id is required`)
            }
            const author = await UserModel.findById({_id})
            if (!author) {
                return notFoundError(`author with id ${_id} not found`)
            }
            return author
        }
    },

    Mutation: {
        createGame: async (_, {input: {UID, title, platform, authorId}}) => {
            const author = await UserModel.findById(authorId)
            if (!author) {
                return badUserInputError('please provide valid author Id')
            }
            const game = await GameModel.create({UID, title, platform})
            if (!game) return internalServerError()
            return game
        },
        deleteGame: async (_, {_id}) => {
            const game = await GameModel.findByIdAndDelete(_id)
            if (!game) return notFoundError('game not found')
            return game
        },
        createAuthor: async (_, {input: {UID, name}}) => {
            const author = await UserModel.create({UID, name})
            if (!author) return internalServerError()
            return author
        },
        deleteAuthor: async (_, {_id}) => {
            const author = await UserModel.findOneAndDelete(_id)
            if (!author) return notFoundError('game not found')
            return author
        },
        createReview: async (_, {input: {UID, rating, content, gameId, authorId}}) => {
            const author = await UserModel.findById(authorId)
            if (!author) {
                return badUserInputError('please provide valid author Id')
            }
            const game = await GameModel.findById(gameId)
            if (!game) {
                return badUserInputError('please provide valid game Id')
            }
            const review = await ReviewModel.create({UID, rating, content, game: gameId, author: authorId})
            if (!review) return internalServerError()
            return review
        },
        deleteReview: async (_, {_id}) => {
            const game = await GameModel.findByIdAndDelete(_id)
            if (!game) return notFoundError('game not found')
            return game
        },
    },

    Game: {
        reviews: async (parent) => {
            const reviews = await ReviewModel.find({game: parent._id})
            return reviews
        }
    },

    Review: {
        game: async (parent) => {
            const game = await GameModel.findByID({_id: parent.game})
            return game
        },
        author: async (parent) => {
            const author = await UserModel.findById({_id: parent.author})
            return author
        }
    },

    Author: {
        reviews: async (parent) => {
            const reviews = await ReviewModel.find({user: parent._id})
            return reviews
        }
    }
}