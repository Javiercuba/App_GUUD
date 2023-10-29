// DataDisplay.js

import React, { useState, useEffect } from "react";

function DataDisplay() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    // Fazer uma solicitação para a API Flask para obter os dados
    fetch("/api/query1")
      .then((response) => response.json())
      .then((data) => setDados(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <div>
      <h1>Dados da API Flask</h1>
      <ul>
        {dados.map((item) => (
          <li key={item.Nome_disciplina}>{item.num_disciplinas}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataDisplay;
