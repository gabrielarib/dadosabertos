import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { Modal } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './css/Table.css';

export default function TableSimples({ campo }) {
  const [processos, setProcessos] = useState([]);
  const [filteredProcessos, setFilteredProcessos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [campoSuggestions, setCampoSuggestions] = useState([]);
  const [campoSearchValue, setCampoSearchValue] = useState('');
  const [valorOrder, setValorOrder] = useState('asc');
  const [quantidadeOrder, setQuantidadeOrder] = useState('asc');
  const [campoOrder, setCampoOrder] = useState('asc');
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

  const openModal = (chart) => {
    setSelectedChart(chart);
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
    setCampoSearchValue('');
    setCampoSuggestions([]);
    setValorOrder('asc');
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/processo/processoPor${campo}`)
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
  
  const getCampoSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : processos.filter(processo => processo[campo].toLowerCase().slice(0, inputLength) === inputValue);
  };

  const renderCampoSuggestion = suggestion => <div>{suggestion[campo]}</div>;

  const onCampoSuggestionSelected = (event, { suggestionValue }) => {
    setCampoSearchValue(suggestionValue);
    setFilteredProcessos(processos.filter(processo => processo[campo] === suggestionValue));
    setValorOrder('asc');
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

  const handleSortByCampo = () => {
    const sortedProcessos = [...filteredProcessos];

    if (campoOrder === 'asc') {
      sortedProcessos.sort((a, b) => {
        if (a[campo] < b[campo]) return -1;
        if (a[campo] > b[campo]) return 1;
        return 0;
      });
      setCampoOrder('desc');
    } else {
      sortedProcessos.sort((a, b) => {
        if (a[campo] > b[campo]) return -1;
        if (a[campo] < b[campo]) return 1;
        return 0;
      });
      setCampoOrder('asc');
    }

    setFilteredProcessos(sortedProcessos);
  };

  const onCampoInputChange = (event, { newValue }) => {
    setCampoSearchValue(newValue);
    setCampoSuggestions(getCampoSuggestions(newValue));
  };

  const campoInputProps = {
    placeholder: `Pesquisar por ${campo}`,
    value: campoSearchValue,
    onChange: onCampoInputChange,
  };

  useEffect(() => {
    setStartIndex(0);
  }, [campoSearchValue]);

  return (
    <div className="container-airbnb row">
      <div className="container">
        <div className="row">
          <span className="fs-4 fw-bold">{`Por ${campo}`}</span>
        </div>
        <div className="row justify-content-between align-items-center my-1">
          <div className="col autosuggest-container">
            <Autosuggest
              suggestions={campoSuggestions}
              onSuggestionsFetchRequested={({ value }) => setCampoSuggestions(getCampoSuggestions(value))}
              onSuggestionsClearRequested={() => setCampoSuggestions([])}
              onSuggestionSelected={onCampoSuggestionSelected}
              getSuggestionValue={suggestion => suggestion[campo]}
              renderSuggestion={renderCampoSuggestion}
              inputProps={campoInputProps}
              containerProps={{
                className: 'autosuggest-suggestions-container',
              }}
            />
          </div>
          <div className="col">
            <button type="button" className="btn btn-light border-dark" onClick={handleReset}>
              <i className="mdi mdi-backspace"></i>
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
            <th scope="col">
              {campo}{' '}
              <i
                className={`mdi mdi-chevron-${campoOrder === 'asc' ? 'down' : 'up'}`}
                onClick={handleSortByCampo}
              ></i>
            </th>
            <th scope="col">
              Quantidade
              <i
                className={`mdi mdi-chevron-${quantidadeOrder === 'asc' ? 'down' : 'up'}`}
                onClick={handleSortByQuantidade}
              ></i>
            </th>
            <th scope="col">
              Valor
              <i
                className={`mdi mdi-chevron-${valorOrder === 'asc' ? 'down' : 'up'}`}
                onClick={handleSortByValor}
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProcessos.slice(startIndex, startIndex + processosPorPagina).map(processo => (
            <tr key={processo.numero}>
              <td>{processo[campo]}</td>
              <td>{processo.quantidade_processos}</td>
              <td>{processo.valor_total_processos}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="1"></td>
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
      <button onClick={() => openModal('quantidade_processos')}>Abrir Gráfico de Quantidade</button>
      <button onClick={() => openModal('valor_total_processos')}>Abrir Gráfico de Valor</button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Gráfico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedChart === 'quantidade_processos' && (
          <BarChart width={450} height={300} data={filteredProcessos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={campo} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade_processos" fill="#8884d8" />
          </BarChart>
        )}
        {selectedChart === 'valor_total_processos' && (
           <BarChart width={450} height={300} data={filteredProcessos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={campo} />
            <YAxis domain={[0, 'dataMax + 6000000']} />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor_total_processos" fill="#8884d8" />
          </BarChart>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setShowModal(false)}>Fechar</button>
      </Modal.Footer>
    </Modal>
      </div>
    </div>
  );
}
