import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Apollo Client core imports
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// React integration for Apollo Client
import { ApolloProvider } from "@apollo/client/react";

import './index.css';
import App from './App.jsx';

// ----------------------
// Apollo Client Setup
// ----------------------
// ApolloClient is responsible for:
// - Sending GraphQL queries/mutations
// - Managing cache
// - Handling network requests
const client = new ApolloClient({
  // HttpLink defines the GraphQL server endpoint
  link: new HttpLink({
    uri: "http://localhost:5000/graphql", // Backend GraphQL API
  }),

  // In-memory cache stores query results
  // This avoids unnecessary network requests
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* ApolloProvider makes Apollo Client available to the entire React component tree */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>

  </StrictMode>
);
