import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs";
class SongList extends Component {

  onSongDelete(id) {

// One of the available functions on props.data is the refetch 
// function. The refetch function will automatically
// re execute any queries that are associated with this songlist component.
// In this case this query or this component has exactly one query 
//  associated with with it which is the fetchsong query.
// So I want to make sure that whenever we delete the song it actually 
// refetches the data that is
// associated from that query. This means the ui updates. We could also 
// use refetch queries object in the query like in songcreate

    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          {title}
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading ... </div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// we have two sepeate mutations
// that use the graphQl function. We have to use multiple
// instance of the graphql helper ie two function calls. It can only call with one query at a
// time.
// ie make a helper with mutation, then make a helper that runs other query
export default graphql(mutation)(graphql(query)(SongList)
);