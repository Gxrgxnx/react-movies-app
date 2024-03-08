import React from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import ThemeProvider from "./context/ThemeContext";
import NavigationBar from "./components/NavigationBar";
import { Home, Login, SignUp } from "./pages";
import "./App.css";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <ThemeProvider>
      <NavigationBar
        navBarProps={
          user
            ? [
                {
                  navTo: "/login",
                  title: "Log out",
                },
              ]
            : [
                {
                  navTo: "/login",
                  title: "Log in",
                },
                {
                  navTo: "/signup",
                  title: "Sign up",
                },
              ]
        }
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
