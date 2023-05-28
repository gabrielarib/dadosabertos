import React from 'react'
import { useState, useEffect } from 'react';
import './css/Table.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { Modal, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TableEstadoAutor() {
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [estadoSuggestions, setEstadoSuggestions] = useState([]);
  const [estadoSearchValue, setEstadoSearchValue] = useState('');
  const [autorSuggestions, setAutorSuggestions] = useState([]);
  const [autorSearchValue, setAutorSearchValue] = useState('');
  const [valorOrder, setValorOrder] = useState('asc');
  const [quantidadeOrder, setQuantidadeOrder] = useState('asc');
  const [autorOrder, setAutorOrder] = useState('asc');
  const [estadoOrder, setEstadoOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedChart, setSelectedChart] = useState('');
  const [resumo, setResumo] = useState([]);
  const [processosPorPagina, setProcessosPorPagina] = useState(3);
  const totalPages = Math.ceil(filteredProcessos.length / processosPorPagina);
  const currentPage = Math.floor(startIndex / processosPorPagina) + 1;
  const [searchBy, setSearchBy] = useState(''); // Estado inicial vazio
  const [searchValue, setSearchValue] = useState(''); // Estado inicial vazio

  useEffect(() => {
  let filtered = processos;

  if (searchBy === 'estado' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Estado === searchValue);
  } else if (searchBy === 'autor' && searchValue !== '') {
    filtered = filtered.filter((processo) => processo.Autor === searchValue);
  }

  setFilteredProcessos(filtered);
}, [processos, searchBy, searchValue]);


  const handleChangeProcessosPorPagina = (event) => {
    const value = parseInt(event.target.value);
    setProcessosPorPagina(value);
    setStartIndex(0);
    setSearchBy('');
    setSearchValue('');
  };
  

const openModal = (chartType) => {
  setSelectedChart(chartType);
  setShowModal(true);
};


const handleNext = () => {
  const nextIndex = startIndex + processosPorPagina;
  if (nextIndex < processos.length) {
    setStartIndex(nextIndex);
    setValorOrder('asc');
  }
};


const handlePrevious = () => {
  const previousIndex = startIndex - processosPorPagina;
  if (previousIndex >= 0) {
    setStartIndex(previousIndex);
    setValorOrder('asc');
  }
};
  


const handleReset = () => {
  setFilteredProcessos(processos);
  setEstadoSuggestions([]);
  setAutorSuggestions([]);
  setAutorSearchValue('');
  setEstadoSearchValue('');
  setValorOrder('asc'); // Redefine a direção da ordenação para ascendente
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

  useEffect(() => {
    axios
      .get('http://localhost:3000/processo/processoResumo')
      .then(response => {
        setResumo(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

// Define as sugestões para o campo de busca
const getEstadoSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : processos.filter(processo =>
    processo.Estado.toLowerCase().slice(0, inputLength) === inputValue
  );
};
const getAutorSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : processos.filter(processo =>
    processo.Autor.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// Renderiza as sugestões de busca
const renderEstadoSuggestion = (suggestion) => (
  <div>
    {suggestion.Estado}
  </div>
);
const renderAutorSuggestion = (suggestion) => (
  <div>
    {suggestion.Autor}
  </div>
);

// Define a ação a ser tomada quando o usuário seleciona uma sugestão
const onEstadoSuggestionSelected = (event, { suggestionValue }) => {
  setEstadoSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Estado === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};
const onAutorSuggestionSelected = (event, { suggestionValue }) => {
  setAutorSearchValue(suggestionValue);
  setFilteredProcessos(processos.filter(processo => processo.Autor === suggestionValue));
  setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
};

const handleSortByValor = () => {
  const sortedProcessos = [...filteredProcessos];

  if (valorOrder === 'asc') {
    sortedProcessos.sort((a, b) => a.Valor_Solicitado - b.Valor_Solicitado);
    setValorOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => b.Valor_Solicitado - a.Valor_Solicitado);
    setValorOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};  

const handleSortByQuantidade = () => {
  const sortedProcessos = [...filteredProcessos];

  if (quantidadeOrder === 'asc') {
    sortedProcessos.sort((a, b) => a.quantidade_processos - b.quantidade_processos);
    setQuantidadeOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => b.quantidade_processos - a.quantidade_processos);
    setQuantidadeOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};

const handleSortByEstado = () => {
  const sortedProcessos = [...filteredProcessos];

  if (estadoOrder === 'asc') {
    sortedProcessos.sort((a, b) => {
      if (a.Estado < b.Estado) return -1;
      if (a.Estado > b.Estado) return 1;
      return 0;
    });
    setEstadoOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => {
      if (a.Estado > b.Estado) return -1;
      if (a.Estado < b.Estado) return 1;
      return 0;
    });
    setEstadoOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};

const handleSortByAutor = () => {
  const sortedProcessos = [...filteredProcessos];

  if (autorOrder === 'asc') {
    sortedProcessos.sort((a, b) => {
      if (a.Autor < b.Autor) return -1;
      if (a.Autor > b.Autor) return 1;
      return 0;
    });
    setAutorOrder('desc');
  } else {
    sortedProcessos.sort((a, b) => {
      if (a.Autor > b.Autor) return -1;
      if (a.Autor < b.Autor) return 1;
      return 0;
    });
    setAutorOrder('asc');
  }

  setFilteredProcessos(sortedProcessos);
};


// Define o valor do campo de busca quando o usuário digita
const onEstadoInputChange = (event, { newValue }) => {
  setEstadoSearchValue(newValue);
  setEstadoSuggestions(getEstadoSuggestions(newValue));
};
const onAutorInputChange = (event, { newValue }) => {
  setAutorSearchValue(newValue);
  setAutorSuggestions(getEstadoSuggestions(newValue));
};

// Configuração do Autosuggest
const estadoInputProps = {
  placeholder: `Pesquisar por Estado`,
  value: estadoSearchValue,
  onChange: onEstadoInputChange,
};
const autorInputProps = {
  placeholder: `Pesquisar por Autor`,
  value: autorSearchValue,
  onChange: onAutorInputChange,
};

useEffect(() => {
  setStartIndex(0);
}, [estadoSearchValue]);
useEffect(() => {
  setStartIndex(0);
}, [autorSearchValue]);


  return (
    <div className="container-airbnb row">

      <div className='container'>
        <div className='row'>
          <span className='fs-4 fw-bold'>{`Por Estado/Autor`}</span>
        </div>
        <div className="row justify-content-between align-items-center my-1">
          <div className="col">
            <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
              <option value="">Pesquisar por</option>
              <option value="autor">Autor</option>
              <option value="estado">Estado</option>
            </select>
            {searchBy === 'estado' && (
              <Autosuggest
                suggestions={estadoSuggestions}
                onSuggestionsFetchRequested={({ value }) => setEstadoSuggestions(getEstadoSuggestions(value))}
                onSuggestionsClearRequested={() => setEstadoSuggestions([])}
                onSuggestionSelected={onEstadoSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Estado}
                renderSuggestion={renderEstadoSuggestion}
                inputProps={estadoInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}
            {searchBy === 'autor' && (
              <Autosuggest
                suggestions={autorSuggestions}
                onSuggestionsFetchRequested={({ value }) => setAutorSuggestions(getAutorSuggestions(value))}
                onSuggestionsClearRequested={() => setAutorSuggestions([])}
                onSuggestionSelected={onAutorSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.Autor}
                renderSuggestion={renderAutorSuggestion}
                inputProps={autorInputProps}
                containerProps={{
                  className: 'autosuggest-suggestions-container',
                }}
              />
            )}
            </div>
          <div className='col'>
          <button type="button" className="btn btn-light border-dark" onClick={handleReset}>
              <i className='mdi mdi-backspace'></i>
              &nbsp; Limpar
          </button>
          </div>
          <div className='col'>
            <span className="fw-bold">Processos por página:</span>
            <select value={processosPorPagina} onChange={handleChangeProcessosPorPagina}>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="col">
            <span className="fw-bold">Página: {currentPage}/{totalPages}</span>
          </div>
        </div>
      </div>
        <table className="table table-light table-striped border">
  <thead>
    <tr>
    <th scope="col">Autor{' '}
        <i
          className={`mdi mdi-chevron-${autorOrder === 'asc' ? 'down' : 'up'}`}
          onClick={handleSortByAutor}
        ></i>
      </th>
      <th scope="col">Tipo do Autor&nbsp;<i className='mdi mdi-help-circle-outline' title="Referem-se aos diferentes tipos de autores de emendas"></i></th>
      <th scope="col">Beneficiario&nbsp;<i className='mdi mdi-help-circle-outline' title="Nome de quem recebe o valor solicitado"></i></th>
      <th scope="col">Estado{' '}
        <i
          className={`mdi mdi-chevron-${estadoOrder === 'asc' ? 'down' : 'up'}`}
          onClick={handleSortByEstado}
        ></i></th>
      <th scope="col">Orgão&nbsp;<i className='mdi mdi-help-circle-outline' title="Orgão governamental do qual o beneficiário faz parte"></i></th>
      <th scope="col">UO&nbsp;<i className='mdi mdi-help-circle-outline' title="Unidade Orçamentária - responsável pela execução orçamentária"></i></th>
      <th scope="col">Ano&nbsp;<i className='mdi mdi-help-circle-outline' title="Ano no qual o processo foi solicitado"></i></th>
      <th scope="col">Objeto&nbsp;<i className='mdi mdi-help-circle-outline' title="Finalidade ou destino específico para o qual os recursos serão destinados"></i></th>
      <th scope="col">Justificativa&nbsp;<i className='mdi mdi-help-circle-outline' title="Explicação detalhada do motivo e do que espera alcançar"></i></th>
      <th scope="col">Valor
        <i
          className={`mdi mdi-chevron-${valorOrder === 'asc' ? 'down' : 'up'}`}
          onClick={handleSortByValor}
        ></i>
      </th>
      </tr>
  </thead>
  <tbody>
    {filteredProcessos.slice(startIndex, startIndex + processosPorPagina).map((processo) => (
      <tr key={processo.numero}>
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
         <td className="fw-bold">
            Valor total&nbsp;
            <i className="mdi mdi-help-circle-outline" title="Valor total obtido pela soma dos valores das emendas listadas na tabela"></i>
          </td>
          <td className="fw-bold">{resumo[0]?.valor_total_processos}</td>
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
