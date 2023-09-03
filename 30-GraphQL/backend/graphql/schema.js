// Inside here we'll define our graphql schema, 
// we first import the package from graphql:

// Section 423: Defining a Mutation Schema 
const {buildSchema} = require('graphql');

module.exports = buildSchema(`

type Post {
    _id: ID!
    title: String!
    content: String! 
    imageUrl: String!
    creator: User!
    createdAt: String! 
    updatedAt: String!
}


type User {
    _id: ID! 
    name: String!
    email: String!
    password: String!
    status: String!
    posts: [Post!]
}


input UserInputData {
    email: String!
    name: String!
    password: String!
}

type RootMutation {
   createUser(userInput: UserInputData): User!
}

schema {
        mutation: RootMutation
    }
`)

// The above is a very basic query where we send 
// a 'hello' query and expect to get back a string or 
// some text, and that text is now defined in our 
// resolvers.js file, it needs to be resolved!

// We can also make the value for the return 
// by appending a '!', this means it's required to 
// be a string

// Also note there are no commas in the schema, just 
// use new lines 