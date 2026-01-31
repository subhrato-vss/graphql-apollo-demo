import './App.css'

import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";

const GET_HELLO = gql`
  query {
    hello
  }
`;

export default function App() {
  const [fetchHello, { data, loading, error }] = useLazyQuery(GET_HELLO);

  return (
    <div>
      <h2>GraphQL Demo</h2>

      <button onClick={() => fetchHello()}>
        Call API
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      {data && <p>{data.hello}</p>}
    </div>
  );
}
