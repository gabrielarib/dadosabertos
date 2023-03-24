import React from 'react';
import PriceSlider from './PriceSlider';
import ButtonGroup from './ButtonGroup';
import Table from './Table';
import { useEffect, useState } from 'react';

//Importar os dados de categoria
import { processos } from '../../backend/dados';


export default function Filtro({ changeAno }) {
    const [anoClicado, setAnoClicado] = useState([]);

    const handleClick = (e, numero) => {
        console.log('A categoria clicada atual é: ' + numero);
        setAnoClicado(numero);
        changeAno(numero);
    }

    return (
        <div className='pt-2 container-airbnb justify-content-between align-items-center'>
            <span className='fw-bold'>Total registros: 10</span>
           <button type="button" className="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className='mdi mdi-filter-variant me-2'></i>
                Filtros
            </button>
            
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header text-center">
                        <button type="button" className="btn-close opacity-100" data-bs-dismiss="modal" aria-label="Close"></button>
                        <h1 className="modal-title w-100 fs-5 fw-bold" id="exampleModalLabel">Filtros</h1>
                    </div>
                <div className="modal-body">
                    <section className='px-2 mb-4 border-bottom'>
                            <span className='fs-4 fw-bold'>Preço</span>
                            <p className='text-muted'>A faixa de preço que se deseja procurar</p>
                            <PriceSlider min={10000} max={2000000} step={1000} />
                        </section>
                        <section className='px-2 mb-4 border-bottom'>
                                <span className='fs-4 fw-bold'>Nome do Autor</span>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Digite o nome"></input>
                                <br></br>
                        </section>
                        <section className='px-2 mb-4 border-bottom'>
                            <span className='fs-4 fw-bold'>Ano</span>
                            <div className='row mt-4'>
                                <div className='col-md-6 mb-4'>
                                    <div className="form-check ms-3">
                                        processos.map((processos, index) => (
                                        <input className="fs-4 form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="inteiro"
                                                key={processos.numero}
                                                onClick={(e) => handleClick(e, processos.numero)}
                                        />
                                        ))
                                        <label className="ps-2 form-check-label" htmlFor="inteiro">
                                            2020 <br/>
                                        </label>
                                    </div>
                                </div>
                                <div className='col-md-6 mb-4'>
                                    <div className="form-check ms-3 px-4">
                                        <input className="fs-4 form-check-input" type="checkbox" value="" id="quartoInteiro"/>
                                        <label className="ps-2 form-check-label" htmlFor="quartoInteiro">
                                            2021 <br/>
                                        </label>
                                    </div>
                                </div>
                                <div className='col-md-6 mb-5'>
                                    <div className="form-check ms-3">
                                        <input className="fs-4 form-check-input" type="checkbox" value="" id="quartoCompartilhado"/>
                                        <label className="ps-2 form-check-label" htmlFor="quartoCompartilhado">
                                            2022 <br/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </section>
                            <section className='px-2 mb-4 border-bottom'>
                            <span className='fs-4 fw-bold'>Tipo de Autor</span>
                            <div className='row mt-4'>
                                <div className='col-md-6 mb-4'>
                                    <div className="form-check ms-3">
                                        <input className="fs-4 form-check-input" type="checkbox" value="" id="inteiro"/>
                                        <label className="ps-2 form-check-label" htmlFor="inteiro">
                                            Externo <br/>
                                        </label>
                                    </div>
                                </div>
                                <div className='col-md-6 mb-4'>
                                    <div className="form-check ms-3 px-4">
                                        <input className="fs-4 form-check-input" type="checkbox" value="" id="quartoInteiro"/>
                                        <label className="ps-2 form-check-label" htmlFor="quartoInteiro">
                                            Deputado<br/>
                                        </label>
                                    </div>
                                </div>
                                <div className='col-md-6 mb-5'>
                                    <div className="form-check ms-3">
                                        <input className="fs-4 form-check-input" type="checkbox" value="" id="quartoCompartilhado"/>
                                        <label className="ps-2 form-check-label" htmlFor="quartoCompartilhado">
                                            Senador <br/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </section>
                            <section className='px-2 mb-4 border-bottom'>
                                <span className='fs-4 fw-bold'>Orgão</span>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Digite o nome do orgão procurado"></input>
                                <br></br>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Digite a Unidade Orçamentária do orgão procurado"></input>
                                <br></br>
                            </section>
                            <section className='px-2 mb-4 border-bottom'>
                                <span className='fs-4 fw-bold'>Beneficiário</span>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Digite o nome do beneficiário"></input>
                                <br></br>
                            </section>
                            <section className='px-2 mb-4 border-bottom'>
                            <span className='fs-4 fw-bold'>Estado</span>
                            <p className='mt-3 px-1'>Quartos</p>
                            <ButtonGroup buttons={["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB",
                            "PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]}/>
                        </section>
                </div>
                <div className="d-flex justify-content-between modal-footer">
                        <a href='#' className='ps-2 link-dark fw-bold'>Remover Filtros</a>
                        <button type="button" className="fw-bold px-4 py-3 btn btn-dark" data-bs-dismiss="modal">Mostrar X acomodações</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

