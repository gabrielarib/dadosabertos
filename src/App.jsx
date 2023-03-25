import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
import '@mdi/font/css/materialdesignicons.css' 
import Filtro from './components/Filtro';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import TableEstado from './components/TableEstado';
import TableAutor from './components/TableAutor';
import TableAno from './components/TableAno';
import TableAutorAno from './components/TableAutorAno';
import TableOrgão from './components/TableOrgão';
import TableResumo from './components/TableResumo';
import TableMunicipioAutor from './components/TableMunicipioAutor';
import TableMunicipio from './components/TableMunicipio';
import Table from './components/Table';
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
        <div className='col-6'>
          <TableEstado/>
        </div>
        <div className='col-6'>
          <TableAutor/>
        </div>
      </div>

      <div className='row my-5 border-bottom'>
        <div className='col-6'>
          <TableAno/>
        </div>
        <div className='col-6'>
          <TableAutorAno/>
        </div>
      </div>

      <div className='row my-5 border-bottom'>
        <div className='col-6'>
          <TableOrgão/>
        </div>
        <div className='col-6'>
          <TableAutor/>
        </div>
      </div>

      <div className='row my-5 border-bottom'>
        <div className='col-6'>
          <TableMunicipio/>
        </div>
        <div className='col-6'>
          <TableMunicipioAutor/>
        </div>
      </div>

      <div className='my-5 border-bottom'>
        <Filtro changeAno = {changeAno}/>
        <Table/>
      </div>
      
      <Footer/>
    </div>
  )
}

export default App
