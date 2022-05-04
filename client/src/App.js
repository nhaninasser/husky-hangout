import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import FixedBottomNavigation from "../src/components/Footer";
import Categories from "../src/components/Categories";
import EventsMobile from '../src/components/Events';
// import Categories from '../src/components/Categories';
import { StoreProvider } from "./utils/GlobalState";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

console.log(client);

function App() {
  return (
    <ApolloProvider client={client}>
    <StoreProvider>      
        <div className="body main-background-color">
          <Categories />
      <EventsMobile />
        </div>
        <FixedBottomNavigation />      
    </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
