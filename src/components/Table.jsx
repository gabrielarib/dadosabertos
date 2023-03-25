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
        <table className="table table-light table-striped border">
  <thead>
    <tr>
      <th scope="col">Autor&nbsp;<i className='mdi mdi-help-circle-outline' title="Nome do requerente do processo"></i></th>
      <th scope="col">Tipo do Autor&nbsp;<i className='mdi mdi-help-circle-outline' title="Referem-se aos diferentes tipos de autores de emendas"></i></th>
      <th scope="col">Beneficiario&nbsp;<i className='mdi mdi-help-circle-outline' title="Nome de quem recebe o valor solicitado"></i></th>
      <th scope="col">Estado&nbsp;<i className='mdi mdi-help-circle-outline' title="O estado onde o beneficiário se encontra"></i></th>
      <th scope="col">Orgão&nbsp;<i className='mdi mdi-help-circle-outline' title="Orgão governamental do qual o beneficiário faz parte"></i></th>
      <th scope="col">UO&nbsp;<i className='mdi mdi-help-circle-outline' title="Unidade Orçamentária - responsável pela execução orçamentária"></i></th>
      <th scope="col">Ano&nbsp;<i className='mdi mdi-help-circle-outline' title="Ano no qual o processo foi solicitado"></i></th>
      <th scope="col">Objeto&nbsp;<i className='mdi mdi-help-circle-outline' title="Finalidade ou destino específico para o qual os recursos serão destinados"></i></th>
      <th scope="col">Justificativa&nbsp;<i className='mdi mdi-help-circle-outline' title="Explicação detalhada do motivo e do que espera alcançar"></i></th>
      <th scope="col">Valor&nbsp;<i className='mdi mdi-help-circle-outline' title="Recursos públicos que serão alocados para a finalidade ou destino específico descrito na emenda"></i></th>
    </tr>
  </thead>
  <tbody>
    {processos.slice(startIndex, startIndex + 3).map((processo,index) => (
      <tr key={index}>
        <td>{processo.nomeAutor}</td>
        <td>{processo.tipoAutor}</td>
        <td>{processo.nomeBeneficiario}</td>
        <td>{processo.estadoBeneficiario}</td>
        <td>{processo.nomeOrgao}</td>
        <td>{processo.uo}</td>
        <td>{processo.ano}</td>
        <td className='cell-truncate'>{processo.objeto}</td>
        <td className='cell-truncate'>{processo.justificativa}</td>
        <td>{processo.valor.toLocaleString('pt-BR')}</td>
      </tr>
    ))}
    <tr>
      <td colSpan="8"></td>
      <td className='fw-bold'>Valor total&nbsp;<i className='mdi mdi-help-circle-outline' title="Valor total obtido pela soma dos valores das emendas listadas na tabela"></i></td>
      <td className='fw-bold'>10.000.000</td>
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
