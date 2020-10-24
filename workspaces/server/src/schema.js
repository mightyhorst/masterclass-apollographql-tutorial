const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    launches( 
      
      """
      👋 The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int

      """
      👉 If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String

    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }

  # 👉 8. Update data with mutations
  type Mutation {
    # if false, signup failed -- check errors
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    # if false, cancellation failed -- check errors
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): User!

    # for use with the iOS tutorial
    uploadProfileImage(file: Upload!): User
  }

  type LaunchConnection { 
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
  type Rocket {
    id: ID!
    name: String
    type: String
  }
  
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }
  
  type Mission { 
    name: String
    missionPatch(size: PatchSize): String
  }
  
  enum PatchSize {
    SMALL
    LARGE
  }
`;

module.exports = typeDefs;
