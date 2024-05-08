//essa função cria uma ação
export const selecionarPessoa = (pessoa) => {
    //esse JSON é a ação criada
    return {
        type: "PESSOA_SELECIONADA",
        dados: pessoa
    }
}