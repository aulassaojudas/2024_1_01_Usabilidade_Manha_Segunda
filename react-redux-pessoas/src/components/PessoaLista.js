import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'primereact/button'
import { selecionarPessoa } from '../actions'

class PessoaLista extends Component{
    render(){
        //console.log(this.props)
        return (
            this.props.pessoas.map((pessoa => 
                <div key={pessoa.nome} className='flex flex-row mb-2 w-6 border border-round border-1 border-400 justify-content-center'>
                    <div className='p-2 w-6'>
                        <p className='text-center'>
                            {pessoa.nome}
                        </p>
                    </div>
                    <div className='flex flex-row justify-content-center align-items-center'>
                        <Button
                            icon="pi pi-info-circle"
                            className="p-button-rounded"
                            onClick={() => this.props.selecionarPessoa(pessoa)}
                        />
                    </div>
                </div>
            ))
        )
    }
}

//esse nome é uma convenção apenas
const mapStateToProps = (state) => {
    //console.log(state)
    return {pessoas: state.pessoas}
}
/*
* A função coonect é chamada. Ela recebe como parâmetro a
* expressão connect(mapStateToProps) e resulta em uma função.
* Ela é chamada com PessoaLista como parâmetro.
* O props de PessoaLista passa a ter acesso ao estado.
*/
const resultadoDaConnect = connect(
    mapStateToProps, {selecionarPessoa})

export default resultadoDaConnect(PessoaLista)