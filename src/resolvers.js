// Our resolvers object's keys will correspond to our schema's types and fields.
const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client

    // From our dataSources object, we'll gain access to our trackAPI
    // (lowercase here as it's the instance of our TrackAPI class extending
    // RESTDataSource) and its getTracks method.
    tracks: (_, __, { dataSources }) => dataSources.trackAPI.getTracks(),

    // returns a single Track by id, for the details page
    track: (_, { id }, { dataSources }) => dataSources.trackAPI.getTrack(id)
  },

  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id)

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track
        }
      } catch (error) {
        return {
          code: error.extensions.response.status,
          success: false,
          message: error.extensions.response.body,
          track: null
        }
      }
    }
  },

  Track: {
    author: ({ authorId }, _, { dataSources }) =>
      dataSources.trackAPI.getAuthor(authorId),
    modules: ({ id }, _, { dataSources }) => dataSources.trackAPI.getModules(id)
  }
}

module.exports = resolvers
