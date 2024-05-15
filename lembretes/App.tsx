import { StyleSheet, View, TextInput, Pressable, Text, FlatList } from 'react-native';
import { useState } from 'react';

interface Lembrete {
  id: string;
  texto: string;
}

export default function App() {
  const [lembrete, setLembrete] = useState('')
  const [lembretes, setLembretes] = useState<Lembrete[]>([])

  const adicionar = () => {
    const novoLembrete: Lembrete = 
      {id: Date.now().toString(), texto: lembrete}
    setLembretes(lembretesAtual => [novoLembrete, //primeiro o novo lembrete
      ...lembretesAtual //extrai todos os lembretes já existentes com o operador spread
    ])
    //limpa o campo em que o usuário digita o lembrete
    setLembrete('')
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder='Digite um lembrete...'
        value={lembrete}
        onChangeText={setLembrete}
        />
        <Pressable 
          style={styles.button}
          onPress={adicionar}
        >
          <Text style={styles.buttonText}>Salvar lembrete</Text>
        </Pressable>
        <FlatList
          style={styles.list}
          keyExtractor={(item) => item.id}
          data={lembretes}
          renderItem={
            lembrete => (
              <View>
                <Text
                  style={styles.listItem}
                  >{lembrete.item.texto}</Text>
              </View>
            )
          }
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    paddingTop: 80
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlign: 'center',
    borderRadius: 4
  },
  button: {
    width: '80%',
    backgroundColor: '#0096F3', //material design blue 500
    padding: 12,
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  list: {
    marginTop: 12,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 4,
    borderRadius: 4
  }

});
