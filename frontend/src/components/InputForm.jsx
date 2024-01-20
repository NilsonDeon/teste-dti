import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {

    const [date, setDate] = useState('');
    const [smallDogs, setSmallDogs] = useState(0);
    const [largeDogs, setLargeDogs] = useState(0);

    const sendData = async () => {
      if(date && smallDogs + largeDogs > 0)
        try {
            const response = await fetch('http://localhost:3001/api/enviar-dados', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ date, smallDogs, largeDogs }),
            });
      
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Erro ao enviar dados:', error);
          }
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
      await sendData();
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="data">Data</label>
            <input name='data' type="date" placeholder='Insira a data' onChange={(e) => setDate(e.target.value)} required />

            <label htmlFor="small">Cães Pequenos</label>
            <input name="small" type="number" placeholder='Insira a quantidade de cahorros'  onChange={(e) => setSmallDogs(e.target.value)} required />

            <label htmlFor="large">Cães Grandes</label>
            <input name="large" type="number" placeholder='Insira a quantidade de cahorros' onChange={(e) => setLargeDogs(e.target.value)} required />

            <div id='form-buttons'>
              <button type="submit" className='highlighted-button'>Calcular</button>
              <button type="reset" className='negative-button'>Limpar</button>
            </div>
        </form>
    );
    
};

export default InputForm;
