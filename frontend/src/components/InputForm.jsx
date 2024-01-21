import React, { useState, useEffect } from "react";


function validateBestPetShop(date, smallDogs, largeDogs){
  const spans = document.querySelectorAll(".spanErrorDog")
  const spanDate = document.querySelector(".spanErrorDate");
  var response = true

  if(!date){
    spanDate.innerHTML = "Insira uma data válida";
    response = false;
  }else {
    console.log('aaaa')
    // não ser data anterior a atual desconsiderando a hora
    const today = new Date();
    date = new Date(date);  

    // separando em dia mes e ano
    var dayToday = today.getDate();
    var monthToday = today.getMonth() + 1;
    var yearToday = today.getFullYear();

    var day = date.getDate() + 1;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    // verificando se o ano dia e mes são no mínimo iguais ao atual
    if(year < yearToday || (year == yearToday && month < monthToday) || (year == yearToday && month == monthToday && day < dayToday)){
      spanDate.innerHTML = "Insira uma data válida, não anterior a atual";

      response = false;
    }else {
      spanDate.innerHTML = "";
    }



    // ter no mínimo um cachorro
    if(smallDogs + largeDogs < 1){
      // colocar texto no span com classe spanErrorDate
        spans.forEach(element => {
          element.innerHTML = "Insira pelo menos um cachorro";
        });
      response = false;
    }else {
      spans.forEach(element => {
        element.innerHTML = "";
      });
    }
  }

  return response;
}

function InputForm() {
  var [date, setDate] = useState("");
  var [smallDogs, setSmallDogs] = useState(0);
  var [largeDogs, setLargeDogs] = useState(0);
  var [data, setData] = useState({}); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateBestPetShop(date, smallDogs, largeDogs)) {
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
    <>
      <h1 id="title">Encontrar Melhor Pet Shop</h1>
      <div id="wrapper">
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="data">Data</label>
            <input
              name="data"
              type="date"
              placeholder="Insira a data"
              onChange={(e) => setDate(e.target.value)}
            />
          <span className="spanErrorDate"></span>
          <label htmlFor="small">Cães Pequenos</label>
          <input
            name="small"
            type="number"
            placeholder="Insira a quantidade de cahorros"
            onChange={(e) => setSmallDogs(e.target.value)}
          />
          <span className="spanErrorDog"></span>
          <label htmlFor="large">Cães Grandes</label>
          <input
            name="large"
            type="number"
            placeholder="Insira a quantidade de cahorros"
            onChange={(e) => setLargeDogs(e.target.value)}
          />
          <span className="spanErrorDog"></span>
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
    </>
  );
};

export default InputForm;
