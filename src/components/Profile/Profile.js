import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Profile.css";

function Profile({ loggedInUsername }) {
  const [userInfo, setUserInfo] = useState({
    username: loggedInUsername || "NombreDeUsuario",
    password: "Contraseña123",
  });

  const navigate = useNavigate(); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    alert("Cambios guardados en localStorage.");

    navigate("/todos-los-personajes");
  };

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Bienvenido, {userInfo.username}!
        </Typography>
        <form>
          <TextField
            className="form-field"
            fullWidth
            label="Nombre de Usuario"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
          />
          <br />
          <TextField
            className="form-field"
            fullWidth
            type="password"
            label="Contraseña"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
          />
          <br />
          <Button variant="contained" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Profile;
