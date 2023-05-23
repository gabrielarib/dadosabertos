import React from 'react'
import { useState, useEffect } from 'react';
import './css/Table.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import Filtro from './Filtro';

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
    axios.get('http://localhost:3000/processo/processoTudo')
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
            processo.Autor.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.Autor}</div>;

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
    placeholder: "Digite o nome do Autor",
    value,
    onChange: onChange,
  };

  return (
    <div className="container-airbnb row">
      <span className='fs-4 fw-bold'>Geral</span>
      <div className='row  justify-content-between align-items-center'>
      <div className='col-2'>
        <Autosuggest
          suggestions={filteredProcessos}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion.Autor}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          ></Autosuggest>
          </div>
        <div className='col-2'>
            <Filtro/>
        </div>
        <div className='col-2'>
            <span className='fw-bold'><i className='mdi mdi-help-circle-outline' title="Quantidade total de registros filtrados"></i>&nbsp;Registros totais: 10</span>
        </div>
      </div>
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
    {filteredProcessos.slice(startIndex, startIndex + 3).map((processo,index) => (
      <tr key={index}>
        <td>{processo.Autor}</td>
        <td>{processo.Tipo_autor}</td>
        <td>{processo.Nome_beneficiario}</td>
        <td>{processo.Uf_Beneficiario}</td>
        <td>{processo.Nome_orgao}</td>
        <td>{processo.Cod_orgao}</td>
        <td>{processo.Data_de_cadastro}</td>
        <td>{processo.Objeto}</td>
        <td>{processo.Justificativa}</td>
        <td>{processo.Valor_Solicitado.toLocaleString('pt-BR')}</td>
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
