import React, { useState, useEffect } from "react";
import "./AddCharacter.css"

function AddCharacter() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState({
    masculino: false,
    femenino: false,
  });

  const [status, setStatus] = useState({
    vivo: false,
    muerto: false,
    jubilado: false,
  });
  const [occupation, setOccupation] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [characters, setCharacters] = useState([]);
  const [editingCharacterId, setEditingCharacterId] = useState(null);

  useEffect(() => {
    const storedCharacters =
      JSON.parse(localStorage.getItem("characters")) || [];
    setCharacters(storedCharacters);
  }, []);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  const handleAddCharacter = () => {
    if (!name || !occupation || !imageURL) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newCharacter = {
      id: new Date().getTime().toString(),
      name,
      gender: Object.keys(gender)
        .filter((key) => gender[key])
        .join(", "),
      status: Object.keys(status)
        .filter((key) => status[key])
        .join(", "),
      occupation,
      imageURL,
    };

    if (editingCharacterId !== null) {
      setCharacters((prevCharacters) =>
        prevCharacters.map((character) =>
          character.id === editingCharacterId ? newCharacter : character
        )
      );
      setEditingCharacterId(null);
    } else {
      setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
    }

    setName("");
    setGender({ masculino: false, femenino: false });
    setStatus({ vivo: false, muerto: false, jubilado: false });
    setOccupation("");
    setImageURL("");
  };

  const handleEditCharacter = (characterId) => {
    const characterToEdit = characters.find(
      (character) => character.id === characterId
    );
    if (characterToEdit) {
      setName(characterToEdit.name);
      setGender({
        masculino: characterToEdit.gender.includes("masculino"),
        femenino: characterToEdit.gender.includes("femenino"),
      });
      setStatus({
        vivo: characterToEdit.status.includes("vivo"),
        muerto: characterToEdit.status.includes("muerto"),
        jubilado: characterToEdit.status.includes("jubilado"),
      });
      setOccupation(characterToEdit.occupation);
      setImageURL(characterToEdit.imageURL);
      setEditingCharacterId(characterId);
    }
  };

  const handleDeleteCharacter = (characterId) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar este personaje?"
    );
    if (confirmed) {
      setCharacters((prevCharacters) =>
        prevCharacters.filter((character) => character.id !== characterId)
      );
      setEditingCharacterId(null);
    }
  };

  const handleCheckboxChange = (type, key) => {
    if (type === "gender") {
      setGender((prevGender) => ({ ...prevGender, [key]: !prevGender[key] }));
    } else if (type === "status") {
      setStatus((prevStatus) => ({ ...prevStatus, [key]: !prevStatus[key] }));
    }
  };

  return (
    <div className="add-character-container">
      <h1>Agregar Personaje</h1>
      <div className="character-form">
        <form>
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Género:
            <label>
              Masculino
              <input
                type="checkbox"
                checked={gender.masculino}
                onChange={() => handleCheckboxChange("gender", "masculino")}
              />
            </label>
            <label>
              Femenino
              <input
                type="checkbox"
                checked={gender.femenino}
                onChange={() => handleCheckboxChange("gender", "femenino")}
              />
            </label>
          </label>
          <br />
          <label>
            Estado:
            <label>
              Vivo
              <input
                type="checkbox"
                checked={status.vivo}
                onChange={() => handleCheckboxChange("status", "vivo")}
              />
            </label>
            <label>
              Muerto
              <input
                type="checkbox"
                checked={status.muerto}
                onChange={() => handleCheckboxChange("status", "muerto")}
              />
            </label>
            <label>
              Jubilado
              <input
                type="checkbox"
                checked={status.jubilado}
                onChange={() => handleCheckboxChange("status", "jubilado")}
              />
            </label>
          </label>
          <br />
          <label>
            Ocupación:
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />
          </label>
          <br />
          <label>
            URL de la Imagen:
            <input
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleAddCharacter}>
            {editingCharacterId !== null
              ? "Editar Personaje"
              : "Agregar Personaje"}
          </button>
        </form>
      </div>
      <div className="characters-list">

      <h2>Personajes Agregados</h2>
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img
              src={character.imageURL}
              alt={character.name}
              style={{ maxWidth: "100%" }}
            />
            <p>Nombre: {character.name}</p>
            <p>Género: {character.gender}</p>
            <p>Estado: {character.status}</p>
            <p>Ocupación: {character.occupation}</p>
            <button
              type="button"
              onClick={() => handleEditCharacter(character.id)}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => handleDeleteCharacter(character.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCharacter;
