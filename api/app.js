import express from "express";
import cors from "cors";

// Import ApolloServer (GraphQL server)
import { ApolloServer } from "@apollo/server";

// Middleware to connect Apollo Server with Express (Express v5 compatible)
import { expressMiddleware } from "@as-integrations/express5";

// ----------------------
// GraphQL Schema (API structure)
// ----------------------
// typeDefs define WHAT data can be queried
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// ----------------------
// Resolvers (Business logic)
// ----------------------
// Resolvers define HOW data is returned for each query
const resolvers = {
    Query: {
        // Resolver for "hello" query
        hello: () => {
            return "Hello from GraphQL Server 🚀";
        },
    },
};

// ----------------------
// Apollo Server Setup
// ----------------------
// Create Apollo GraphQL server with schema & resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start Apollo Server (required before applying middleware)
await server.start();

// ----------------------
// Express App Setup
// ----------------------
const app = express();

app.use(cors());
app.use(express.json());

// Attach Apollo GraphQL middleware to Express
// All GraphQL requests will go through /graphql
app.use("/graphql", expressMiddleware(server));

// ----------------------
// Start HTTP Server
// ----------------------
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
});
