import React from 'react'
import { useState, useEffect } from 'react';

import { processos } from '../../backend/dados';

export default function Table() {
  return (
    <div className="container-airbnb">
        <table className="table table-light table-striped border">
  <thead>
    <tr>
      <th scope="col" className="tooltip bs-tooltip-top" role="tooltip">Nome Autor</th>
      <th scope="col">Tipo Autor</th>
      <th scope="col">Nome Beneficiario</th>
      <th scope="col">Estado Beneficiario</th>
      <th scope="col">Orgão</th>
      <th scope="col">UO</th>
      <th scope="col">Ano</th>
      <th scope="col">Objeto</th>
      <th scope="col">Justificativa</th>
      <th scope="col">Valor</th>
    </tr>
  </thead>
  <tbody>
    {processos.map((processo,index) => (
      <tr key={index}>
        <td>{processo.nomeAutor}</td>
        <td>{processo.tipoAutor}</td>
        <td>{processo.nomeBeneficiario}</td>
        <td>{processo.estadoBeneficiario}</td>
        <td>{processo.nomeOrgao}</td>
        <td>{processo.uo}</td>
        <td>{processo.ano}</td>
        <td>{processo.objeto}</td>
        <td>{processo.justificativa}</td>
        <td>{processo.valor.toLocaleString('pt-BR')}</td>
      </tr>
    ))}
    <tr>
      <td colSpan="8"></td>
      <td className='fw-bold'>Valor total</td>
      <td className='fw-bold'>10.000.000</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}
