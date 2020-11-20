import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    // this is how we call the mutation. using this.props.mutate
    // then we add variable
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        //   refetch query from fetchSongs after mutation
        // the reason we do it this way is because this query is not associated
        // with this component. On songlist page we do it in a different way - we don't have
        // access to this.props.data.refetch()
        // THIS DOES MAKE ANOTHER NETWORK REQUEST THOUGH
        // - could use mb data caching -- see index page
        refetchQueries: [{ query }],
        //   if we did need to add variables it would
        // be [{query: query, variables: this.state.title}]
      })
      .then(() => hashHistory.push("/"));
    //   mutate is a promise use then to go to home page
  }
  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song Title</label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  # this is a template for how you create a mutation
  # with a parameter
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
