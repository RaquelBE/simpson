import React, { useState, useEffect } from "react";
import "./SearchCharacter.css";

function SearchCharacter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        const response = await fetch(
          `https://apisimpsons.fly.dev/api/personajes?page=${currentPage}&limit=5`
        );
        const apiData = await response.json();

        if (apiData.docs) {
          setAllCharacters(apiData.docs);
          setTotalPages(apiData.total_pages);
        }
      } catch (error) {
        console.error("Error fetching all characters:", error);
      }
    };

    fetchAllCharacters();
  }, [currentPage]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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

  const filteredCharacters = allCharacters.filter((character) =>
    character.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="characters-container">
        <div className="characters-grid">
          {filteredCharacters.map(renderCharacter)}
        </div>
        <div className="pagination">
          <span>Página {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchCharacter;
