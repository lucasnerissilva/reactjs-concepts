import React, { useState, useEffect } from "react";

import "./styles.css";

import {
  findRepositories,
  addRepository,
  deleteRepository
} from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    loadRepositories().then(respositories => {
      setRepositories(respositories);
    });
  }, []);

  const loadRepositories = async () => {
    const response = await findRepositories("repositories");

    if (!response || !response.data || !response.data.length) return [];

    return response.data;
  };

  async function handleAddRepository() {
    // TODO
    const response = await addRepository({
      title: "Gaby delicia",
      url: "new repository url",
      techs: ["react", "react-native"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await deleteRepository(id);
    setRepositories(repositories.filter(r => r.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map(p => {
            return (
              <li key={p.id}>
                {p.title}
                <button onClick={() => handleRemoveRepository(p.id)}>
                  Remover
                </button>
              </li>
            );
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
