import React, { useState, useEffect } from "react";
import "./SearchCharacter.css";

function SearchCharacter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `https://apisimpsons.fly.dev/api/personajes`
        );
        console.log("PERSONAJE", characters)
        const apiData = await response.json();

        if (apiData.docs) {
          setCharacters(apiData.docs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchTerm, characters]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderCharacter = (character) => (
    <div key={character._id} className="character-card">
      <img src={character.Imagen} alt={character.Nombre} />
      <p>Nombre: {character.Nombre}</p>
      <p>Genero: {character.Genero}</p>
      <p>Estado: {character.Estado}</p>
      <p>Ocupación: {character.Ocupacion}</p>
      <p>Historia: {character.Historia}</p>
    </div>
  );

  return (
    <div className="search-container">
      <h1 className="search-title">Buscamos a...</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar personaje..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="character-list">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map(renderCharacter)
        ) : (
          <p>No se encontraron personajes.</p>
        )}
      </div>
    </div>
  );
}

export default SearchCharacter;
