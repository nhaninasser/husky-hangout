import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FixedBottomNavigation from "./components/Footer";
import EventsMobile from "./components/Events";
import Login from "./components/Login";
import AccountMenu from "./components/Header";
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
        <BrowserRouter>
          <AccountMenu></AccountMenu>
          <div className="body main-background-color">
            {/* /* <Categories } */}
            <Routes>
              <Route
              path="/"
              element={<EventsMobile />}
              />
              <Route
              path="/login"
              element={<Login/>}
              />
            </Routes>
          </div>
          <FixedBottomNavigation />
        </BrowserRouter>
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
