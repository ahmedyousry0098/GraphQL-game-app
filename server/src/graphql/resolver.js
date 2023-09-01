import db from '../db/static.db.js'
import { UserModel } from '../db/models/user.model.js'
import { ReviewModel } from '../db/models/review.model.js'
import { GameModel } from '../db/models/game.model.js'
import {GraphQLError} from 'graphql'
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
        game: async (_, {UID}) => {
            if (!UID) {
                return validationError(`game id is required`)
            }
            const game = await GameModel.findOne({UID})
            if (!game) {
                return notFoundError(`game with id ${UID} not found`)
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
        review: async (_, {UID}) => {
            if (!UID) {
                return validationError(`review id is required`)
            }
            const review = await ReviewModel.findOne({UID})
            if (!review) {
                return notFoundError(`review with id ${UID} not found`)
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
        author: async (_, {UID}) => {
            if (!UID) {
                return validationError(`author id is required`)
            }
            const author = await UserModel.findOne({UID})
            if (!author) {
                return notFoundError(`author with id ${UID} not found`)
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
        deleteGame: async (_, {UID}) => {
            const game = await GameModel.findOneAndDelete({UID}, {new: true})
            if (!game) return notFoundError('game not found')
            return game
        },
        createAuthor: async (_, {input: {UID, name}}) => {
            const author = await UserModel.create({UID, name})
            if (!author) return internalServerError()
            return author
        },
        deleteAuthor: async (_, {UID}) => {
            const author = await UserModel.findOneAndDelete({UID}, {new: true})
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
        deleteReview: async (_, {UID}) => {
            const game = await GameModel.findOneAndDelete({UID}, {new: true})
            if (!game) return notFoundError('game not found')
            return game
        },


    },

    Game: {
        reviews: async (parent) => {
            const reviews = await ReviewModel.find({})
        }
    },

    Review: {
        game: (parent) => {
            return db.games.find(game => game.id === parent.game_id)
        },
        author: (parent) => {
            return db.authors.find(a => a.id === parent.author_id)
        }
    },

    Author: {
        reviews: (parent) => {
            return db.reviews.filter(rev => rev.id === parent.aut)
        }
    }
}