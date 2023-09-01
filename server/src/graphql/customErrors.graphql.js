import { GraphQLError } from "graphql";
import {ApolloServerErrorCode} from '@apollo/server/errors'

export function notFoundError(message) {
    throw new GraphQLError(message, {
        extensions: {code: "NOT_FOUND"}
    })
}

export function badUserInputError(message) {
    throw new GraphQLError(message, {
        extensions: {code: ApolloServerErrorCode.BAD_USER_INPUT}
    })
}

export function internalServerError(message) {
    throw new GraphQLError(message || "internal server error", {
        extensions: {code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR}
    })
}

export function validationError(message) {
    throw new GraphQLError(message, {
        extensions: ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
    })
}