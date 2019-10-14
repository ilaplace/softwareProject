import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory" 
import { HttpLink } from "apollo-link-http"
import { ApolloProvider } from "@apollo/react-hooks"
import { setContext } from "apollo-link-context"
import { configURI } from './constants'

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: configURI.url.API_URL.concat('graphql')
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  //console.log(token);
  
  
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink)
});
  
  
ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    audience={config.audience}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
