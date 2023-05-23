import React from 'react'
import { useState, useEffect } from 'react';
import './css/Table.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TableSimples({campo}) {
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
    axios.get(`http://localhost:3000/processo/processoPor${campo}`)

      .then(response => {
        setProcessos(response.data);
        setFilteredProcessos(response.data); 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Define as sugestões para o campo de busca
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : processos.filter(processo =>
      processo[campo].toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // Renderiza as sugestões de busca
  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion[campo]}
    </div>
  );

  // Define a ação a ser tomada quando o usuário seleciona uma sugestão
  const onSuggestionSelected = (event, { suggestionValue }) => {
    setSearchValue(suggestionValue);
    setFilteredProcessos(processos.filter(processo => processo[campo] === suggestionValue));
  };

  // Define o valor do campo de busca quando o usuário digita
  const onInputChange = (event, { newValue }) => {
    setSearchValue(newValue);
    setSuggestions(getSuggestions(newValue));
  };

  // Configuração do Autosuggest
  const inputProps = {
    placeholder: `Pesquisar por ${campo}`,
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
          <span className='fs-4 fw-bold'>{`Por ${campo}`}</span>
        </div>
        <div className='row justify-content-between align-items-center my-1'>
          <div className='col autosuggest-container'>
          <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
              onSuggestionsClearRequested={() => setSuggestions([])}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={(suggestion) => suggestion[campo]}
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
      <th scope="col">{campo}</th>
      <th scope="col">Quantidade</th>
      <th scope="col">Valor</th>
    </tr>
  </thead>
  <tbody>
    {filteredProcessos.slice(startIndex, startIndex + 3).map((processo) => (
         <tr key={processo.numero}>
          <td>{processo[campo]}</td>
          <td>{processo.quantidade_processos}</td>
          <td>{processo.valor_total_processos}</td>
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

<div>
<BarChart width={600} height={300} data={filteredProcessos}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey={campo} />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="quantidade_processos" fill="#8884d8" />
</BarChart>

<BarChart width={600} height={300} data={filteredProcessos}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey={campo} />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="valor_total_processos" fill="#82ca9d" />
</BarChart>

</div>


    </div>
  );
}
