import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import OAuthCallback from "./pages/OAuthCallback";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Repositories from "./pages/Repositories";

const App = () => {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/repositories" element={<Repositories />}></Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
