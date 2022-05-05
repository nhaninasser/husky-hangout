import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';
import FixedBottomNavigation from "./components/Footer";
import Login from "./components/Login";
import AccountMenu from "./components/Header";
import EventsPage from "./pages/EventsPage";
import { StoreProvider } from "./utils/GlobalState";
import SingleEvent from "./components/singleEvent";
import AddEvent from "./components/AddEvent";
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

console.log(client);

function App() {
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <BrowserRouter>
          <AccountMenu></AccountMenu>
          <div className="body main-background-color max-height">            
            <Routes>
              <Route
              path="/"
              element={<EventsPage />}
              />
              <Route
              path="/event/:id"
              element={<SingleEvent />}
              />
              <Route
              path="/login"
              element={<Login/>}
              />
              <Route
              path="/addEvent"
              element={<AddEvent></AddEvent>}
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
