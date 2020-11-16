import './style/style.css'
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import SongList from "./components/SongList";
import { Router, hashHistory, IndexRoute, Route } from "react-router";
import App from "./components/App"
import SongCreate from "./components/SongCreate"
import SongDetail from "./components/SongDetail"


const client = new ApolloClient({
  // allows caching. It means look and cache all data
  // and use id field to recognise to it - and keep track of
  // it. Ie when song is updated it will cause react to
  // rerender
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
     <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
        <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
