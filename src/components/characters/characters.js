import React, { useState, useEffect } from "react";
import "./characters.css";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `https://apisimpsons.fly.dev/api/personajes?page=${currentPage}&limit=5`
        );
        const apiData = await response.json();
        console.log("Data from API:", apiData);

        if (apiData.docs) {
          setCharacters(apiData.docs);
          setTotalPages(apiData.total_pages);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCharacters();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderCharacter = (character) => (
    <div key={character._id} className="character-card">
      <img src={character.Imagen} alt={character.name} />
      <p>Nombre: {character.Nombre}</p>
      <p>Genero: {character.Genero}</p>
      <p>Estado: {character.status}</p>
      <p>Ocupación: {character.Ocupacion}</p>
      <p>Historia: {character.Historia}</p>
    </div>
  );

  return (
    <div className="characters-container">
      <h1>Personajes</h1>
      <div className="characters-grid">{characters.map(renderCharacter)}</div>
      <div className="pagination">
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Characters;
