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
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header text-center">
                        <button type="button" className="btn-close opacity-100" data-bs-dismiss="modal" aria-label="Close"></button>
                        <h1 className="modal-title w-100 fs-5 fw-bold" id="exampleModalLabel">Filtros</h1>
                    </div>
                <div className="modal-body">
                    <section className='px-2 mb-4 border-bottom'>
                            <span className='fs-4 fw-bold'>Valor</span>
                            <p className='text-muted'>É o valor solicitado no processo</p>
                            <PriceSlider min={10000} max={2000000} step={1000} />
                        </section>

                        <section className='px-2 mb-4 border-bottom'>
                                <span className='fs-4 fw-bold'>Autor</span>
                                <p className='text-muted'>É o requerente do processo</p>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Digite o nome do autor"></input>
                                <br></br>
                                <p className='text-muted'>O tipo de autor:</p>
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
                            <span className='fs-4 fw-bold'>Ano</span>
                            <p className='text-muted'>É o ano no qual o processo foi solicitado</p>
                            <div className='row mt-4'>
                                <div className='col-md-6 mb-4'>
                                    <div className="form-check ms-3">
                                        <input className="fs-4 form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="inteiro"
                                        />
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
                                <span className='fs-4 fw-bold'>Beneficiário</span>
                                <p className='text-muted'>É quem recebe o valor solicitado</p>
                                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Digite o nome do beneficiário"></input>
                                <br></br>
                                <p className='text-muted'>O estado onde o beneficiário se encontra:</p>
                                <span className='fs-4 fw-bold'>Estado</span>
                                <ButtonGroup buttons={["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB",
                                "PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]}/>
                            </section>

                            <section className='px-2 mb-4 border-bottom'>
                                    <span className='fs-4 fw-bold'>Orgão</span>
                                    <p className='text-muted'>É o orgão governamental do qual o beneficiário faz parte</p>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Digite o nome do orgão procurado"></input>
                                    <br></br>
                                    <p className='text-muted'>É uma unidade administrativa responsável pela execução orçamentária</p>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Digite a Unidade Orçamentária (UO) do orgão procurado"></input>
                                    <br></br>
                            </section>
                </div>
                <div className="d-flex justify-content-between modal-footer">
                        <a href='#' className='ps-2 link-dark fw-bold'>Remover Filtros</a>
                        <button type="button" className="fw-bold px-4 py-3 btn btn-dark" data-bs-dismiss="modal">Mostrar X processos</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

