import React, { useState, useEffect } from "react";
import "./SearchCharacter.css"; // Importa el archivo de estilos CSS

function SearchCharacter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    fetch("https://apisimpsons.fly.dev/api/personajes")
      .then((response) => response.json())
      .then((apiData) => {
        console.log("Data from API:", apiData);
        setCharacters(apiData.docs);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [characters, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Buscar Personaje</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar personaje..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="character-list">
        {filteredCharacters.map((character) => (
          <div key={character._id} className="character-card">
            <img src={character.Imagen} alt={character.Nombre} />
            <p>Name: {character.Nombre}</p>
            <p>Gender: {character.Genero}</p>
            <p>Status: {character.Estado}</p>
            <p>Occupation: {character.Ocupacion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchCharacter;
