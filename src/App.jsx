import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
import '@mdi/font/css/materialdesignicons.css' 
import Filtro from './components/Filtro';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import TableAutorAno from './components/TableAutorAno';
import TableResumo from './components/TableResumo';
import TableEstadoAutor from './components/TableEstadoAutor';
import Table from './components/Table';
import TableSimples from './components/TableSimples';
import Title from './components/Title'
import { useEffect, useState } from 'react';

import { processos } from '../backend/dados';

function App() {
  const [allHouses, setAllHouses] = useState(processos);
  const [filterHouses, setfilterHouses] = useState([]);
  const [catID, setCatID] = useState(2022);

  useEffect(() => {
    console.log(allHouses);
    filterByAno(catID);
  }, [allHouses])

  useEffect(() => {
    console.log(filterHouses);
  }, [filterHouses])

  useEffect(() => {
    console.log('A categoria atual é: ' + catID);
  }, [catID])

  const changeAno = (ano) => {
    setCatID(ano);
    filterByAno(ano);
  }

  const filterByAno = (numero) =>{
    const novaLista = allHouses.filter((item)=>{
      return item.ano === numero;
    })
    setfilterHouses(novaLista);
  }

  return (
    <div>
      <Navbar/>
      <Title/>
      <TableResumo/>

      <div className='row my-5 border-bottom'>
        <div className='col-6'><TableSimples campo="estado"/></div>
        <div className='col-6'><TableSimples campo="autor"/></div>
      </div>

      <div className='row my-5 border-bottom'>
        <div className='col-6'><TableSimples campo="ano"/></div>
        <div className='col-6'><TableSimples campo="orgao"/></div>
      </div>

      <div className='row my-5 border-bottom'>
        <div className='col-6'>
          <TableAutorAno/>
        </div>
        <div className='col-6'>
          <TableEstadoAutor/>
        </div>
      </div>

      <div className='my-5 border-bottom'>
        <Table/>
      </div>
      
      <Footer/>
    </div>
  )
}

export default App
