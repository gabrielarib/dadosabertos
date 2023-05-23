import React from 'react'
import { useState, useEffect } from 'react';
import './css/Table.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

export default function Table() {
  const [processos, setProcessos] = useState([]);
  const [value, setValue] = useState("");
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex(startIndex + 3);
  };
  const handlePrevious = () => {
    setStartIndex(startIndex - 3);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/orgao/orgaoPorValor')
      .then(response => {
        setProcessos(response.data);
        setFilteredProcessos(response.data); 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : filteredProcessos.filter(
          (processo) =>
            processo.Nome_orgao.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.Nome_orgao}</div>;

  const onSuggestionsFetchRequested = ({ value }) => {
    setFilteredProcessos(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setFilteredProcessos(processos);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Digite o orgão procurado",
    value,
    onChange: onChange,
  };

  return (
    <div className="container-airbnb row">
      <span className='fs-4 fw-bold'>Por Orgão</span>
      <div className='row  justify-content-between align-items-center'>
        <div className='col-1'>
          <Autosuggest
          suggestions={filteredProcessos}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.Nome_orgao}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          ></Autosuggest>
        </div>
        <div className='col-1'>
            <button type="button" className="btn btn-light border-dark my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i className='mdi mdi-filter-variant me-2'></i>
                Filtros
            </button>
        </div>
        <div className='col-2'>
            <span className='fw-bold'><i className='mdi mdi-help-circle-outline' title="Quantidade total de registros filtrados"></i>&nbsp;Registros totais: 10</span>
        </div>
      </div>
      
        <table className="table table-light table-striped border">
  <thead>
    <tr>
      <th scope="col">Orgão&nbsp;<i className='mdi mdi-help-circle-outline' title="O estado onde o beneficiário se encontra"></i></th>
      <th scope="col">Quantidade&nbsp;<i className='mdi mdi-help-circle-outline' title="Quantidade Total"></i></th>
      <th scope="col">Valor&nbsp;<i className='mdi mdi-help-circle-outline' title="Recursos públicos que serão alocados para a finalidade ou destino específico descrito na emenda"></i></th>
    </tr>
  </thead>
  <tbody>
      {filteredProcessos.slice(startIndex, startIndex + 3).map((orgao) => (
         <tr key={orgao.numero}>
          <td>{orgao.Nome_orgao}</td>
          <td>{orgao.qtd}</td>
          <td>{orgao.soma}</td>
        </tr>
      ))}
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
