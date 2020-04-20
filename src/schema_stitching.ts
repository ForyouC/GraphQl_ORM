import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
    mergeSchemas,
  } from 'graphql-tools';
  
  // Mocked chirp schema
  // We don't worry about the schema implementation right now since we're just
  // demonstrating schema stitching.
  const chirpSchema = makeExecutableSchema({
    typeDefs: `
      type Chirp {
        id: ID!
        text: String
        authorId: ID!
      }
  
      type Query {
        chirpById(id: ID!): Chirp
        chirpsByAuthorId(authorId: ID!): [Chirp]
      }
    `
  });
  
  addMockFunctionsToSchema({ schema: chirpSchema });
  
  // Mocked author schema
  const authorSchema = makeExecutableSchema({
    typeDefs: `
      type User {
        id: ID!
        email: String
      }
  
      type Query {
        userById(id: ID!): User
      }
    `
  });
  
  addMockFunctionsToSchema({ schema: authorSchema });
  
  export const schema = mergeSchemas({
    schemas: [
      chirpSchema,
      authorSchema,
    ],
  });