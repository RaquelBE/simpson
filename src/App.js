// App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import AddCharacter from "./components/Add-character/AddCharacter";
import Characters from "./components/characters/characters";
import SearchCharacter from "./components/Search-character/SearchCharacter";
import Profile from "./components/Profile/Profile"; // Asegúrate de importar correctamente

const App = function () {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = function (username) {
    setLoggedInUser(username);
  };

  const handleLogout = function () {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div className="container">
        {loggedInUser ? (
          <>
            <Navbar onLogout={handleLogout} />
            <Routes>
              <Route
                path="/todos-los-personajes"
                element={<Characters loggedInUser={loggedInUser} />}
              />
              <Route
                path="/agregar-personaje"
                element={<AddCharacter loggedInUser={loggedInUser} />}
              />
              <Route
                path="/buscar-personaje"
                element={<SearchCharacter loggedInUser={loggedInUser} />}
              />
              <Route
                path="/perfil"
                element={<Profile loggedInUsername={loggedInUser} />}
              />
              <Route path="/" element={<h1>Bienvenido, {loggedInUser}!</h1>} />
            </Routes>
          </>
        ) : (
          <div>
            <Login onLogin={handleLogin} />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
