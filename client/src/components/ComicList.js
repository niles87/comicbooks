import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getComicBooksQuery = gql`
  {
    comicbooks {
      name
      id
    }
  }
`;

class ComicList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <ul id="comic-list">
          {data.loading ? (
            <div>Loading...</div>
          ) : (
            data.comicbooks.map((comic) => {
              return <li key={comic.id}>{comic.name}</li>;
            })
          )}
        </ul>
      </div>
    );
  }
}

export default graphql(getComicBooksQuery)(ComicList);
