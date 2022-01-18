const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "Get all tracks (array) for homepage grid"
    tracks: [Track!]!
    "Get a specific track by id"
    track(id: ID!): Track
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    title: String!
    "The track's description. It can be in Markdown format"
    description: String!
    author: Author!
    thumbnail: String
    "The track's approximate length to complete, in seconds"
    durationInSeconds: Int
    length: Int @deprecated(reason: "Use durationInSeconds instead")
    modules: [Module!]!
    modulesCount: Int
    numberOfViews: Int
  }

  type Module {
    id: ID!
    title: String!
    "The module's video duration, in seconds"
    durationInSeconds: Int
    length: Int @deprecated(reason: "Use durationInSeconds")
  }

  type Author {
    id: ID!
    name: String!
    photo: String
  }

  type Mutation {
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
  }

  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }
`

module.exports = typeDefs
