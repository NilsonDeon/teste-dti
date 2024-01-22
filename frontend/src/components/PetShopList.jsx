import React, { useEffect, useState } from "react";
import Modal from "react-modal"

Modal.setAppElement("#root");



function PetShopList() {
  var [name, setName] = useState(""); 
  var [distance, setDistance] = useState(0); 
  var [smallWeek, setSmallWeek] = useState(0); 
  var [largeWeek, setLargeWeek] = useState(0); 
  var [smallWeekend, setSmallWeekend] = useState(0); 
  var [largeWeekend, setLargeWeekend] = useState(0);  
  const [petShops, setPetShops] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const newData = {
        name: name,
        distance: distance,
        smallWeek: smallWeek,
        largeWeek: largeWeek,
        smallWeekend: smallWeekend,
        largeWeekend: largeWeekend,
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
      closeModal();
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

  function openModal(){
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false)
  }
  
  return (
    <>    
    <div id="petshop-table" >
      <div id="header-list">
        <h2>Lista de PetShops</h2>
        <button
          className="highlighted-button round-button"
          onClick={openModal}
        >
          +
        </button>
      </div>
      <div id="scrollable-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Distância</th>
              <th>Dia Útil <br /> Cão Pequeno</th>
              <th>Dia Útil <br /> Cão Grande</th>
              <th>Final de Semana <br /> Cão Pequeno</th>
              <th>Final de Semana <br /> Cão Grande</th>
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
      </div>
    </div>
    
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      overlayClassName="modal-overlay"
      className={"modal-content"}
    >


        <h3> Inserir Pet Shop</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)}
          placeholder="Insira o Nome do Pet Shop"
            required />
        <label htmlFor="distance">Distância</label>
        <input type="number" name="distance" onChange={(e) => setDistance(e.target.value)}
          placeholder="Insira a Distância ao Pet Shop" step={0.01}  required />
        <div className="week">
          <h4>Preço - Dia Útil</h4>
          <label htmlFor="smallWeek">Cão Pequeno</label>
          <input type="number" name="smallWeek" onChange={(e) => setSmallWeek(e.target.value)}
          placeholder="Insira o Preço de Banho em Cão Pequeno no Dia Útil"
          step={0.01}
            required/>
          <label htmlFor="largeWeek">Cão Grande</label>
          <input type="number" name="largeWeek" onChange={(e) => setLargeWeek(e.target.value)}
          placeholder="Insira o Preço de Banho em Cão Grande no Dia Útil"
          step={0.01}
            required />
        </div>
        <div className="weekend">
          <h4>Preço - Final de Semana</h4>
          <label htmlFor="smallWeekend">Cão Pequeno</label>
          <input type="number" name="smallWeekend" onChange={(e) => setSmallWeekend(e.target.value)}
          placeholder="Insira o Preço de Banho em Cão Pequeno no Final de Semana"
          step={0.01}
            required />
          <label htmlFor="largeWeekend">Cão Grande</label>
          <input type="number" name="largeWeekend" onChange={(e) => setLargeWeekend(e.target.value)}
          placeholder="Insira o Preço de Banho em Cão Grande no Final de Semana"
          step={0.01}
            required />
        </div>
        
        <div className="modal-button">
          <button type="submit" className="highlighted-button">Adicionar</button>
          <button onClick={closeModal} className="negative-button">Cancelar</button>
        </div>
        
      </form>
      
    </Modal>

    </>
  );

}

export default PetShopList;
