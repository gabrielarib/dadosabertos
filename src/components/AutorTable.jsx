import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Table.css';

const AutorTable = () => {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    // Função para buscar os autores filtrados
    const fetchAutoresFiltrados = async () => {
      try {
        const response = await axios.get('http://localhost:3000/autor/AutorFiltro');
        setAutores(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAutoresFiltrados();
  }, []);

  return (
    <div className='container-airbnb row container'>
      <h2>Tabela de Autores</h2>
      <table className="table table-light table-striped border">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Tipo de Autor</th>
          </tr>
        </thead>
        <tbody>
          {autores.map(autor => (
            <tr key={autor.id}>
                <td>{autor.id}</td>
              <td>{autor.Autor}</td>
              <td>{autor.Tipo_autor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AutorTable;
