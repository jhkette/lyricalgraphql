import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (!song) { return <div>Loading...</div>; }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  // here to add the id needed to query for an individual song, we need to use this syntax
  // we call options with props and return a variable object with a key of id (for the song id)
  // !! The props argument is the same as this.props. ie the same props the component receives !!
  options: (props) => {return {variables: {id: props.params.id}}}
})(SongDetail)