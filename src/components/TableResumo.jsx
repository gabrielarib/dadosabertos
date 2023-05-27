import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Table.css';

export default function TableResumo() {
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/processo/processoResumo')
      .then(response => {
        setProcessos(response.data);
        setFilteredProcessos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container-airbnb row border-bottom">
      <p className="text-muted my-1">Resumo</p>

      <table className="table table-light table-striped border">
        <thead>
          <tr>
            <th scope="col">
              Quantidade de Emendas do Relator{' '}
              <i className="mdi mdi-help-circle-outline" title="Quantidade Total"></i>
            </th>
            <th scope="col">
              Valor Total{' '}
              <i className="mdi mdi-help-circle-outline" title="Recursos públicos que serão alocados para a finalidade ou destino específico descrito na emenda"></i>
            </th>
            <th scope="col">
              Quantidade de Estados{' '}
              <i className="mdi mdi-help-circle-outline" title="O estado onde o beneficiário se encontra"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProcessos.map(processo => (
            <tr key={processo.numero}>
              <td>{processo.quantidade_processos}</td>
              <td>{processo.valor_total_processos}</td>
              <td>{processo.quantidade_estados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
