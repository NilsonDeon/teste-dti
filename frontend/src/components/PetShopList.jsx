import React, { useEffect, useState } from "react";

function PetShopList() {
  const [petShops, setPetShops] = useState([]);

  const addPetShopToDatabase = async () => {
    try {
      const newData = {
        name: "Novo PetShop",
        distance: 5,
        smallWeek: 20,
        largeWeek: 30,
        smallWeekend: 25,
        largeWeekend: 35,
      };

      const response = await fetch("http://localhost:3001/api/criar-dados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      // Tratar erros relacionados à resposta HTTP, se necessário
      if (!response.ok) {
        throw new Error("Erro ao adicionar PetShop ao banco de dados");
      }

      // Atualizar a lista de PetShops após adicionar com sucesso
      const updatedPetShops = await fetch(
        "http://localhost:3001/api/receber-dados"
      ).then((res) => res.json());
      setPetShops(updatedPetShops);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/receber-dados");
        const data = await response.json();
        setPetShops(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div id="header-list">
        <h3>Lista de PetShops</h3>
        <button
          className="highlighted-button"
          id="round-button"
          onClick={addPetShopToDatabase}
        >
          +
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Distância</th>
            <th>Dia Útil - Cão Pequeno</th>
            <th>Dia Útil - Cão Grande</th>
            <th>Final de Semana - Cão Pequeno</th>
            <th>Final de Semana - Cão Grande</th>
          </tr>
        </thead>
        <tbody>
          {petShops.map((petShop, index) => (
            <tr key={index}>
              <td>{petShop.name}</td>
              <td>{petShop.distance} km</td>
              <td>{petShop.smallWeek}</td>
              <td>{petShop.largeWeek}</td>
              <td>{petShop.smallWeekend}</td>
              <td>{petShop.largeWeekend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PetShopList;
