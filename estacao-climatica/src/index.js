import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";

import { EstacaoClimatica } from "./EstacaoClimatica";
import Loading from './Loading'

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     latitude: null,
  //     longitude: null,
  //     estacao: null,
  //     data: null,
  //     icone: null,
  //     mensagemDeErro: null,
  //   };
  // }
  state = {
    latitude: null,
    longitude: null,
    estacao: null,
    data: null,
    icone: null,
    mensagemDeErro: null,
    mostrar: false
  };

  timer = null;
  componentDidMount() {
    this.obterLocalizacao()
    console.log("componentDidMount");
    //this.timer = setInterval(() => {
    //  this.setState({ data: new Date().toLocaleTimeString() });
    //}, 1000);
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
    clearInterval(this.timer);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate App", this.state.mostrar);
  }

  obterEstacao = (data, latitude) => {
    console.log(data);
    const anoAtual = data.getFullYear();
    //new Date(ano, mês(0 a 11), dia (1 a 31))
    //01/01 - norte:inverno, sul:verao
    const d0 = new Date(anoAtual, 0, 1);

    // 21/03 - norte:primavera, sul:outono
    const d1 = new Date(anoAtual, 2, 21);

    // 21/06 - norte:verao, sul:inverno
    const d2 = new Date(anoAtual, 5, 21);

    // 24/09 - norte:outono, sul:primavera
    const d3 = new Date(anoAtual, 8, 24);

    // 22/12 - norte:inverno, sul:verao
    const d4 = new Date(anoAtual, 11, 22);

    //hemisferio sul tem latitude negativa
    const sul = latitude < 0;

    if (data >= d0 && data < d1) return sul ? "Verão" : "Inverno";
    else if (data >= d1 && data < d2) return sul ? "Outono" : "Primavera";
    else if (data >= d2 && data < d3) return sul ? "Inverno" : "Verão";
    else if (data >= d3 && data < d4) return sul ? "Primavera" : "Outono";
    else return sul ? "Verão" : "Inverno";
  };

  icones = {
    Primavera: "fa-seedling",
    Verão: "fa-umbrella-beach",
    Outono: "fa-tree",
    Inverno: "fa-snowman",
  };

  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (posicao) => {
        let data = new Date();
        let estacao = this.obterEstacao(data, posicao.coords.latitude);
        let icone = this.icones[estacao];
        console.log(icone);
        console.log("Chamou a localização")
        this.setState({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          estacao: estacao,
          data: data.toLocaleTimeString(),
          icone: icone,
        });
      },
      (erro) => {
        console.log(erro);
        this.setState({ mensagemDeErro: `Tente novamente mais tarde` });
      }
    );
  };

  mostrarCoordenadas = () => {
    this.setState({mostrar: true})
    console.log("Chamou o mostrarCoordenadas.")
  }

  render() {
    console.log("App inicial");
    console.log(this.state);
    return (
      <div>
        <div className="container mt-2">
          <div className="row justify-content-center">
            <div className="col-md-8">
              {
                (!this.state.latitude && !this.state.mensagemDeErro)?
                  <Loading mensagem='Por favor, responda à solicitação de localização.'/>
                :
                  this.state.mensagemDeErro ? (
                  <p className="border rounded p-2 fs-1 text-center">
                    É preciso dar permissão para acesso à localização. Atualize a
                    página e tente de novo, ajustando a configuração no seu
                    navegador.
                  </p>
                ) : (
                  <EstacaoClimatica
                    icone={this.state.icone}
                    estacao={this.state.estacao}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    obterLocalizacao={this.obterLocalizacao}
                    mostrarCoordenadas={this.mostrarCoordenadas}
                    mostrar={this.state.mostrar}
                  />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
