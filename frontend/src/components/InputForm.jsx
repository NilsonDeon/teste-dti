import React, { useState, useEffect } from "react";

var InputForm = () => {
  var [date, setDate] = useState("");
  var [smallDogs, setSmallDogs] = useState(0);
  var [largeDogs, setLargeDogs] = useState(0);
  var [data, setData] = useState({});

  useEffect(() => {
    // Realizar ação quando `data` for atualizado
  }, [data]); // O array de dependências garante que o efeito é chamado apenas quando `data` muda

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (date && smallDogs + largeDogs > 0) {
      var body = { date: date, smallDogs: smallDogs, largeDogs: largeDogs };
      try {
        const response = await fetch("http://localhost:3001/api/enviar-dados", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    }
  };

  return (
    <div id="wrapper">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="data">Data</label>
        <input
          name="data"
          type="date"
          placeholder="Insira a data"
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor="small">Cães Pequenos</label>
        <input
          name="small"
          type="number"
          placeholder="Insira a quantidade de cahorros"
          onChange={(e) => setSmallDogs(e.target.value)}
          required
        />
        <label htmlFor="large">Cães Grandes</label>
        <input
          name="large"
          type="number"
          placeholder="Insira a quantidade de cahorros"
          onChange={(e) => setLargeDogs(e.target.value)}
          required
        />
        <div id="form-buttons">
          <button type="submit" className="highlighted-button">
            Calcular
          </button>
          <button type="reset" className="negative-button">
            Limpar
          </button>
        </div>
      </form>

      {Object.keys(data).length > 0 && ( // Renderiza somente se data não estiver vazio
        <div id="response">
          <p>O petshop com o melhor preço foi: {data.name}</p>
          <p>
            Com o preço de R${" "}
            {parseFloat(data.price).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      )}
      
    </div>
  );
};

export default InputForm;
