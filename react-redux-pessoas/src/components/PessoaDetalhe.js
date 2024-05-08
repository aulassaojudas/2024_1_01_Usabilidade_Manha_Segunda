import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'primereact/card'

const PessoaDetalhe = (props) => {
    return <Card title="Detalhes">
        <h3 className='text-center'>
        {props.pessoa?.nome}&nbsp;{props.pessoa?.sobrenome}</h3>
        <p className="text-center">{props.pessoa?.endereco}</p>
    </Card>
}

const mapStateToProps = (state) => {
    return {
        //o componente poderá acessar o objeto referenciado por pessoa
        //usando o seu objeto props
        pessoa: state.pessoaSelecionada
    }
}

export default connect(mapStateToProps)(PessoaDetalhe)