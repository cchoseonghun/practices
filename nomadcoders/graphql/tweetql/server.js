import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1", 
    text: "hello", 
    userId: "2"
  }, 
  {
    id: "2", 
    text: "seonghun", 
    userId: "1"
  }
]

let users = [
  {
    id: "1", 
    firstName: "seonghun", 
    lastName: "cho"
  }, 
  {
    id: "2", 
    firstName: "eden", 
    lastName: "lee"
  }
]

const typeDefs = gql`
  type User {
    id: ID!
    username: String  
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    }, 
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    }, 
    allUsers() {
      console.log(1);
      return users;$
    }, 
  }, 
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1, 
        text, 
      };
      tweets.push(newTweet);
      return newTweet; 
    }, 
  }, 
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }
  }, 
  Tweet: {
    author({ userId }) {
      return users.find(user => user.id === userId);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => { 
  console.log(`Running on ${url}`);
})