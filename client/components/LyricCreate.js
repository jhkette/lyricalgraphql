import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";


class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  onSubmit(event) {
    event.preventDefault(); // prevent event default
    // whenever we associate a mutation with a component 
    // we get access to this.props.mutate. We call this with the
    // an object with a variables key
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          // we pass songId this down from songCreate component
          songId: this.props.songId,
        },
        
      })
     
      // return a promise so chain on a promise
      .then(() => this.setState({ content: "" }));
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
# nb we always need to ask for id back for data caching (see index.js)
# we need to return all the data is expecting - this ran an error initially because
# we did not add likes. IE if you go to songQuery it is expected to haves likes queried as well
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
export default graphql(mutation)(LyricCreate);


