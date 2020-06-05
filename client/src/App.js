import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ComicList from "./components/ComicList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Comic List</h1>
          <ComicList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
