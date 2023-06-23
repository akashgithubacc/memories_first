import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    //React router dom is the react package which allows us to create websites containing multiple webpages
    //We need to wrap our app.js in BrowserRouter
    //For providing multiple paths, we need to use Routes and Route
    //All the path inside Routes will show only one component depending on the url, we are in
    <GoogleOAuthProvider clientId="848767098696-kk4tdbnm0c748s1t9u49qcebmmn2m3us.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />

            <Route
              path="/posts"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />

            <Route
              path="/posts/search"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />

            <Route path="/posts/:id" element={<PostDetails />} />

            <Route
              path="/auth"
              element={
                !user ? (
                  <Auth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                ) : (
                  <Navigate to="/posts" />
                )
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
