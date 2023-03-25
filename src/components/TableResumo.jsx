import React from 'react'
import { useState, useEffect } from 'react';
import './css/Table.css';

import { processos } from '../../backend/dados';

export default function Table() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(startIndex + 3);
  };
  const handlePrevious = () => {
    setStartIndex(startIndex - 3);
  };

  return (
    <div className="container-airbnb row border-bottom">
      <p className='text-muted my-1'>Resumo</p>

        <table className="table table-light table-striped border">
  <thead>
    <tr>
      <th scope="col">Quantidade de Emendas&nbsp;<i className='mdi mdi-help-circle-outline' title="Quantidade Total"></i></th>
      <th scope="col">Valor&nbsp;<i className='mdi mdi-help-circle-outline' title="Recursos públicos que serão alocados para a finalidade ou destino específico descrito na emenda"></i></th>
      <th scope="col">Quantidade de Estados&nbsp;<i className='mdi mdi-help-circle-outline' title="O estado onde o beneficiário se encontra"></i></th>
      
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>51.648</td>
        <td>137.404.330.510,83</td>
        <td>28</td>
      </tr>
  </tbody>
</table>
    </div>
  );
}
