import { combineReducers } from "redux"
const pessoasReducer = () => {
    return [
        {
            nome: 'Cristina', sobrenome: 'Silva', endereco: 'Rua A, 34'
        },
        {
            nome: 'João', sobrenome: 'Alves', endereco: 'Rua B, 43'
        },
        {
            nome: 'Pedro', sobrenome: 'Mendes', endereco: 'Rua D, 200'
        }
    ]
}

const pessoaSelecionadaReducer = (pessoaSelecionada = null, acao) => {
    if (acao.type === 'PESSOA_SELECIONADA'){
        return acao.dados
    }
    return pessoaSelecionada
}

export default combineReducers({
    pessoas: pessoasReducer,
    pessoaSelecionada: pessoaSelecionadaReducer
})