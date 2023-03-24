import React from 'react'
//Importar CSS desse component
import './css/Navbar.css';
//Importar Imagem
import logo from '../assets/OrçamentoSecreto.png';

export default function Navbar() {
    return (
        <div>
            <nav className='nav-topo'>
                <div className='container-airbnb'>
                    <div className='col-sm-6'>
                        <img className='logo' src={logo} alt="Logo do Site"/>
                    </div>
                    <div className='d-flex align-items-center justify-content-end col-sm-6'>
                        <a href="https://exposedvocesabia.wixsite.com/exposed---tudo-que-e/blank-1" target="_blank" className='link-especial'><i className='mdi mdi-alert-circle'></i>       Entenda o termo</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}
