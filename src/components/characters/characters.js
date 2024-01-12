import React, { useState, useEffect } from "react";
import "./characters.css"; 

function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://apisimpsons.fly.dev/api/personajes")
      .then((response) => response.json())
      .then((apiData) => {
        console.log("Data from API:", apiData);
        setCharacters(apiData.docs);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderCharacter = (character) => (
    <div key={character._id} className="character-card">
      <img src={character.Imagen} alt={character.Nombre} />
      <p>Name: {character.Nombre}</p>
      <p>Gender: {character.Genero}</p>
      <p>Status: {character.Estado}</p>
      <p>Occupation: {character.Ocupacion}</p>
    </div>
  );

  return (
    <div className="characters-container">
      <h1>Personajes</h1>
      <div className="characters-grid">{characters.map(renderCharacter)}</div>
    </div>
  );
}

export default Characters;
