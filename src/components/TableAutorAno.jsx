import React from 'react'
import { useState, useEffect } from 'react';
import './css/Table.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { Modal, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TableAutorAno() {
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [autorSuggestions, setAutorSuggestions] = useState([]);
  const [autorSearchValue, setAutorSearchValue] = useState('');
  const [valorOrder, setValorOrder] = useState('asc');
  const [quantidadeOrder, setQuantidadeOrder] = useState('asc');
  const [autorOrder, setAutorOrder] = useState('asc');
  const [anoOrder, setAnoOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedChart, setSelectedChart] = useState('');
  const [resumo, setResumo] = useState([]);
  const [processosPorPagina, setProcessosPorPagina] = useState(3);
  const totalPages = Math.ceil(filteredProcessos.length / processosPorPagina);
  const currentPage = Math.floor(startIndex / processosPorPagina) + 1;


  const handleChangeProcessosPorPagina = (event) => {
    const value = parseInt(event.target.value);
    setProcessosPorPagina(value);
    setStartIndex(0);
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
    setAutorSearchValue('');
    setAutorSuggestions([]);
    setValorOrder('asc'); // Redefine a direção da ordenação para ascendente
  };
  

  useEffect(() => {
    axios.get(`http://localhost:3000/processo/processoPorAutorAno`)

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
  const getAutorSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : processos.filter(processo =>
      processo.Autor.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // Renderiza as sugestões de busca
  const renderAutorSuggestion = (suggestion) => (
    <div>
      {suggestion.Autor}
    </div>
  );

  // Define a ação a ser tomada quando o usuário seleciona uma sugestão
  const onAutorSuggestionSelected = (event, { suggestionValue }) => {
    setAutorSearchValue(suggestionValue);
    setFilteredProcessos(processos.filter(processo => processo.Autor === suggestionValue));
    setValorOrder('asc'); // Redefine a direção da ordenação ao selecionar uma sugestão
  };

  const handleSortByValor = () => {
    const sortedProcessos = [...filteredProcessos];
  
    if (valorOrder === 'asc') {
      sortedProcessos.sort((a, b) => a.valor_total_processos - b.valor_total_processos);
      setValorOrder('desc');
    } else {
      sortedProcessos.sort((a, b) => b.valor_total_processos - a.valor_total_processos);
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

  const handleSortByAno = () => {
    const sortedProcessos = [...filteredProcessos];
  
    if (anoOrder === 'asc') {
      sortedProcessos.sort((a, b) => {
        if (a.Ano < b.Ano) return -1;
        if (a.Ano > b.Ano) return 1;
        return 0;
      });
      setAnoOrder('desc');
    } else {
      sortedProcessos.sort((a, b) => {
        if (a.Ano > b.Ano) return -1;
        if (a.Ano < b.Ano) return 1;
        return 0;
      });
      setAnoOrder('asc');
    }
  
    setFilteredProcessos(sortedProcessos);
  };


  // Define o valor do campo de busca quando o usuário digita
  const onAutorInputChange = (event, { newValue }) => {
    setAutorSearchValue(newValue);
    setAutorSuggestions(getAutorSuggestions(newValue));
  };

  // Configuração do Autosuggest
  const autorInputProps = {
    placeholder: `Pesquisar por Autor`,
    value: autorSearchValue,
    onChange: onAutorInputChange,
  };

  useEffect(() => {
    setStartIndex(0);
  }, [autorSearchValue]);
  

  return (
    <div className="container-airbnb row">

      <div className='container'>
        <div className='row'>
          <span className='fs-4 fw-bold'>{`Por Autor/Ano`}</span>
        </div>
        <div className='row justify-content-between align-items-center my-1'>
          <div className='col autosuggest-container'>
          <Autosuggest
              suggestions={autorSuggestions}
              onSuggestionsFetchRequested={({ value }) => setAutorSuggestions(getAutorSuggestions(value))}
              onSuggestionsClearRequested={() => setAutorSuggestions([])}
              onSuggestionSelected={onAutorSuggestionSelected}
              getSuggestionValue={(suggestion) => suggestion.Autor}
              renderSuggestion={renderAutorSuggestion}
              inputProps={autorInputProps}
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
        ></i></th>
      <th scope="col">Ano{' '}
        <i
          className={`mdi mdi-chevron-${anoOrder === 'asc' ? 'down' : 'up'}`}
          onClick={handleSortByAno}
        ></i>
      </th>
      <th scope="col">Quantidade
        <i
          className={`mdi mdi-chevron-${quantidadeOrder === 'asc' ? 'down' : 'up'}`}
          onClick={handleSortByQuantidade}
        ></i>
      </th>
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
          <td>{processo.Ano}</td>
          <td>{processo.quantidade_processos}</td>
          <td>{processo.valor_total_processos}</td>
        </tr>
      ))}
    <tr>
      <td colSpan="2"></td>
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
      <div>
        <div>
          <button onClick={() => openModal('quantidade_processos')}>Abrir Gráfico de Quantidade</button>
          <button onClick={() => openModal('valor_total_processos')}>Abrir Gráfico de Valor</button>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Gráfico</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedChart === 'quantidade_processos' && (
              <BarChart width={450} height={300} data={filteredProcessos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Autor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade_processos" fill="#8884d8" />
              </BarChart>
            )}
            {selectedChart === 'valor_total_processos' && (
              <BarChart width={450} height={300} data={filteredProcessos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Autor" />
                <YAxis domain={[0, 'dataMax + 6000000']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor_total_processos" fill="#82ca9d" />
              </BarChart>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
          </Modal.Footer>
        </Modal>

      </div>



    </div>
  );
}
