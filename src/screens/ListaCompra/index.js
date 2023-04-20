import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles'

const MinhaTela = ({navigation}) => {
  const [compras, setCompras] = useState([]);
  const [compraSelecionada, setCompraSelecionada] = useState(null);

  useEffect(() => {
    async function fetchCompras() {
      try {
        const response = await fetch('https://backend-estoque-production.up.railway.app/compras');
        const json = await response.json();
        setCompras(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCompras();
  }, [compras]);

  const handlePress = (id_compra) => {
    if (compraSelecionada === id_compra) {
      setCompraSelecionada(null);
    } else {
      setCompraSelecionada(id_compra);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id_compra)}>
      <View style={styles.item}>
        <Text>Código da Compra: {item.id_compra}</Text>
        <Text>Total: {item.total}</Text>
        <Text>{new Date(item.data_compra).toLocaleDateString('pt-BR')}</Text>
      </View>
      {compraSelecionada === item.id_compra && (
        <View style={styles.itemDetalhes}>
          <Text style={styles.itemDetalhesTitulo}>Itens da Compra:</Text>
          {item.ItemCompras.map((itemCompra) => (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} key={itemCompra.id_item_compra}>
              <Text style={styles.itemDetalhesText}>{itemCompra.Produto.nome}</Text>
              <Text style={styles.itemDetalhesText}>{itemCompra.quantidade} x {itemCompra.preco_unitario}</Text>
              <Text style={styles.itemDetalhesText}>R$ {itemCompra.subtotal}</Text>
              
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  const getTotalCompras = () => {
    return compras.reduce((total, compra) => total + parseFloat(compra.total), 0);
  };

  return (
    <View style={styles.container}> 
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, justifyContent: 'center' }}>
        <Text style={{ marginRight: 10 , fontWeight: 'bold', fontSize:18}}>Total: R$</Text>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>{getTotalCompras()}</Text>
      </View>
      <FlatList
        data={compras}
        keyExtractor={(item) => item.id_compra}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MinhaTela;
