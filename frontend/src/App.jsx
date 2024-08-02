import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import OAuthCallback from "./pages/OAuthCallback";
import Profile from "./pages/Profile";
import Navbar from "./components/MenuAppBar";
import Repositories from "./pages/Repositories";
import OtherUsers from "./pages/OtherUsers";

const App = () => {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/repositories" element={<Repositories />} />
          <Route path="/otherusers" element={<OtherUsers />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
