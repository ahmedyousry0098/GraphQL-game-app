import db from '../db/static.db.js'

export const resolvers = {
    Query: {
        games: (_, {id}) => {
            return db.games
        },
        reviews: () => {
            return db.reviews
        },
        authors: () => {
            return db.authors
        }
    },

    Game: {
        reviews: (parent) => {
            console.log(`parent: ${JSON.stringify(parent)}`);
            return db.reviews.filter(rev => rev.game_id === parent.id)
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