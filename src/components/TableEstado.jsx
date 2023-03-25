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
    <div className="container-airbnb row">
      <span className='fs-4 fw-bold'>Por Estado</span>
      <div className='row  justify-content-between align-items-center'>
        <div className='col-3'>
            <button type="button" className="btn btn-light border-dark my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i className='mdi mdi-filter-variant me-2'></i>
                Filtros
            </button>
        </div>
        <div className='col-5'>
            <span className='fw-bold'><i className='mdi mdi-help-circle-outline' title="Quantidade total de registros filtrados"></i>&nbsp;Registros totais: 10</span>
        </div>
      </div>
      
        <table className="table table-light table-striped border">
  <thead>
    <tr>
      <th scope="col">Estado&nbsp;<i className='mdi mdi-help-circle-outline' title="O estado onde o beneficiário se encontra"></i></th>
      <th scope="col">Quantidade&nbsp;<i className='mdi mdi-help-circle-outline' title="Quantidade Total"></i></th>
      <th scope="col">Valor&nbsp;<i className='mdi mdi-help-circle-outline' title="Recursos públicos que serão alocados para a finalidade ou destino específico descrito na emenda"></i></th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>SP</td>
        <td>20</td>
        <td>1.000.000</td>
      </tr>
      <tr>
        <td>AC</td>
        <td>55</td>
        <td>1.140.000</td>
      </tr>
      <tr>
        <td>PR</td>
        <td>16</td>
        <td>957.000</td>
      </tr>
    <tr>
      <td colSpan="1"></td>
      <td className='fw-bold'>Valor total&nbsp;<i className='mdi mdi-help-circle-outline' title="Valor total obtido pela soma dos valores das emendas listadas na tabela"></i></td>
      <td className='fw-bold'>3.287.000</td>
    </tr>
  </tbody>
</table>
<div>
  <button onClick={handlePrevious} disabled={startIndex === 0}>
    Anterior
  </button>
  <button onClick={handleNext} disabled={startIndex + 3 >= processos.length}>
    Próximo
  </button>
</div>



    </div>
  );
}
