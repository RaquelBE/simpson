import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Login.css";

const Login = function (props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = function () {
    if (username && password) {
      props.onLogin(username);
    } else {
      alert("Por favor, introduce un nombre de usuario y una contraseña.");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardContent>
          <TextField
            label="Usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <br />
          <Button
            variant="contained"
            onClick={handleLogin}
            fullWidth
            className="login-button"
          >
            Iniciar sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
