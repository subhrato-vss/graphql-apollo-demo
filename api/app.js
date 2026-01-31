import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

// ----------------------
// GraphQL Schema
// ----------------------
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// ----------------------
// Resolvers (logic)
// ----------------------
const resolvers = {
    Query: {
        hello: () => {
            return "Hello from GraphQL Server 🚀";
        },
    },
};

// ----------------------
// Server setup
// ----------------------
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/graphql", expressMiddleware(server));

// ----------------------
// LIsten Server
// ----------------------
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
});
