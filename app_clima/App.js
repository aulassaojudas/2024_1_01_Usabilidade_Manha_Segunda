import React, { useState } from "react";
import { Button, FlatList, StyleSheet, TextInput, View, Text } from "react-native";
import PrevisaoItem from "./components/PrevisaoItem";
import {API_KEY} from '@env'
//crie o arquivo .env na mesma pasta que o App.js e coloque lá
//API_KEY=sua_chave_de_api
//sem aspas e sem espaço entre o sinal de igual, o nome da chave e
//o conteúdo
//configure o babel.config.js conforme o que está aqui no projeto
//instale o react-native-dotenv com o npm install

export default function App() {
  const endpoint =
    "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&q=";
  const apiKey = `${API_KEY}`;
  const [cidade, setCidade] = useState("");
  const capturarCidade = (cidade) => {
    setCidade(cidade);
  };
  const [previsoes, setPrevisoes] = useState([])
  const obtemPrevisoes = () => {
    setPrevisoes([])
    const target = endpoint + cidade + "&appid=" + apiKey
    fetch(target)
    .then((dados) => dados.json())
    .then((dados) => {
      setPrevisoes(dados['list'])
      Keyboard.dismiss()
    }).catch((err) => console.log(err))
  }
  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome de uma cidade"
          value={cidade}
          onChangeText={capturarCidade}
        />
        <Button 
          title="Ok" 
          onPress={obtemPrevisoes}  
        />
      </View>
      <FlatList 
        data={previsoes}
        renderItem={
          previsao => (
            <PrevisaoItem previsao={previsao}/>
          )
        }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 60,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: "#BB96F3",
    borderBottomWidth: 2,
    textAlign: "left",
    flexGrow: 0.9,
  },
  entrada: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
