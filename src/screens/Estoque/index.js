import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TextInput,  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles'

function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [ordemCrescente, setOrdemCrescente] = useState(true);

  useEffect(() => {
    async function buscarProdutos() {
      const response = await fetch('https://backend-estoque-production.up.railway.app/produtos');
      const data = await response.json();
      console.log(data);
      setProdutos(data);
    }
    buscarProdutos();
  }, []);



  // Filtrando a lista de produtos pelo nome
  const listaFiltrada = produtos.filter(
    (produto) => produto.nome.toLowerCase().indexOf(filtro.toLowerCase()) !== -1
  );



  // Ordenando a lista de produtos pela quantidade
  const listaOrdenada = listaFiltrada.sort((a, b) => {
    if (ordemCrescente) {
      return b.estoque - a.estoque;
    } else {
      return a.estoque - b.estoque;
    }
  });
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.shearchBar}
          onChangeText={setFiltro}
          value={filtro}
          placeholder="Pesquisar produto"
        />
        <Icon
          name={ordemCrescente ? 'arrow-upward' : 'arrow-downward'}
          size={30}
          style={styles.icon_list}
          onPress={() => setOrdemCrescente(!ordemCrescente)}
        />
      </View>
      <FlatList style={styles.list}
        data={listaOrdenada}
        keyExtractor={(produto) => produto.id_produto.toString()}
        renderItem={({ item }) => (
          <View style={[styles.item_list,{ opacity: item.estoque === 0 ? 0.5 : 1 }]}>
            <Text style={[styles.nome]}>{item.nome}</Text>
            <Text style={styles.preco}>R${item.preco}</Text>
            <Text style={styles.estoque}>Estoque: {item.estoque}</Text>
            {item.estoque < 10 ? (
  <Icon
    style={styles.icon_item}
    size={20}
    name="warning"
    color="red"
  />
) : item.estoque >= 50 ? (
  <Icon
    style={styles.icon_item}
    size={20}
    name="check-circle"
    color="green"
  />
) : null}
          </View>
        )}
      />
    </View>
  );
}

export default Estoque;
