import React from 'react'
import { useState, useEffect } from 'react';
import './css/Table.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function Table() {
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleNext = () => {
    setStartIndex(startIndex + 3);
  };
  const handlePrevious = () => {
    setStartIndex(startIndex - 3);
  };

  const handleReset = () => {
    setFilteredProcessos(processos);
    setSearchValue('');
    setSuggestions([]);
  }

  useEffect(() => {
    axios.get('http://localhost:3000/processo/processoPorEstadoAutor')
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
            processo.Estado.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.Estado}</div>;


  // Define a ação a ser tomada quando o usuário seleciona uma sugestão
  const onSuggestionSelected = (event, { suggestionValue }) => {
    setSearchValue(suggestionValue);
    setFilteredProcessos(processos.filter(processo => processo.Estado === suggestionValue));
  };

  // Define o valor do campo de busca quando o usuário digita
  const onInputChange = (event, { newValue }) => {
    setSearchValue(newValue);
    setSuggestions(getSuggestions(newValue));
  };

  // Configuração do Autosuggest
  const inputProps = {
    placeholder: `Pesquisar por Estado`,
    value: searchValue,
    onChange: onInputChange,
  };

  useEffect(() => {
    setStartIndex(0);
  }, [searchValue]);
  

  return (
    <div className="container-airbnb row">

    <div className='container'>
      <div className='row'>
        <span className='fs-4 fw-bold'>{`Por Estado/Autor`}</span>
      </div>
      <div className='row justify-content-between align-items-center my-1'>
        <div className='col autosuggest-container'>
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
            onSuggestionsClearRequested={() => setSuggestions([])}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={(suggestion) => suggestion.Estado}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            containerProps={{
              className: 'autosuggest-suggestions-container'
            }}
          />
        </div>
        <div className='col'>
        <button type="button" className="btn btn-light border-dark" onClick={handleReset}>
            <i className='mdi mdi-backspace'></i>
            &nbsp; Limpar
        </button>
        </div>
        <div className='col'>
            <span className='fw-bold'>Registros totais: 10</span>
        </div>
      </div>
    </div>
       
        <table className="table table-light table-striped border">
  <thead>
    <tr>
      <th scope="col">Municipio&nbsp;<i className='mdi mdi-help-circle-outline' title="O estado onde o beneficiário se encontra"></i></th>
      <th scope="col">Autor&nbsp;<i className='mdi mdi-help-circle-outline' title="O estado onde o beneficiário se encontra"></i></th>
      <th scope="col">Quantidade&nbsp;<i className='mdi mdi-help-circle-outline' title="Quantidade Total"></i></th>
      <th scope="col">Valor&nbsp;<i className='mdi mdi-help-circle-outline' title="Recursos públicos que serão alocados para a finalidade ou destino específico descrito na emenda"></i></th>
    </tr>
  </thead>
  <tbody>
    {filteredProcessos.slice(startIndex, startIndex + 3).map((processo) => (
         <tr key={processo.numero}>
          <td>{processo.Estado}</td>
          <td>{processo.Autor}</td>
          <td>{processo.Quantidade}</td>
          <td>{processo.Valor}</td>
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
