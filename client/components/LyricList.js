import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricList extends Component {
  onLike(id, likes) {
    // use optimistic response here to get instant update to client
    // mutation still get sent to server
    // https://hasura.io/learn/graphql/typescript-react-apollo/optimistic-update-mutations/2-mutation-cache/
    // https://www.apollographql.com/docs/react/performance/optimistic-ui/
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  }
  renderLyrics() {
    if (this.props.lyrics) {
      return this.props.lyrics.map(({ id, content, likes }) => {
        return (
          <li key={id} className="collection-item">
            {content}
            <div className="vote-box">
              <i
                className="material-icons"
                onClick={() => this.onLike(id, likes)}
              >
                thumb_up
              </i>
              {likes}
            </div>
          </li>
        );
      });
    }
  }
  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}
const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
