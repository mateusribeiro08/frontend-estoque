import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles'

const MinhaTela = ({navigation}) => {
  const [vendas, setVendas] = useState([]);
  const [tipoPagamento, setTipoPagamento] = useState(null);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);
  const tiposPagamento = [
    { id:1 ,label: "Selecionar", value: null },
    { id:2, label: "Dinheiro", value: "dinheiro" },
    { id:3, label: "Cartão de crédito", value: "credito" },
    { id:4, label: "Cartão de débito", value: "debito" },
    { id:5, label: "Pix", value: "pix" }
  ];

  useEffect(() => {
    async function fetchVendas() {
      try {
        const response = await fetch('https://backend-estoque-production.up.railway.app/vendas');
        const json = await response.json();
        setVendas(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVendas();
  }, [vendas]);

  const handlePress = (id_venda) => {
    if (vendaSelecionada === id_venda) {
      setVendaSelecionada(null);
    } else {
      setVendaSelecionada(id_venda);
    }
  };

  const renderItem = ({ item }) => {
    const mostrarItens = item.id_venda === vendaSelecionada;
  
    return (
      <TouchableOpacity onPress={() => handlePress(item.id_venda)}>
        <View style={styles.item}>
          <Text>Código da Venda: {item.id_venda}</Text>
          <Text>Total: {item.total}</Text>
          <Text>{new Date(item.data_venda).toLocaleDateString('pt-BR')}</Text>
          {mostrarItens && (
            <View style={styles.itensContainer}>
              <Text style={styles.itensTitle}>Itens de Venda:</Text>
              {item.ItemVendas.map((itemVenda) => (
                <View style={styles.itemVenda} key={itemVenda.id_item_venda}>
                  <Text>{itemVenda.Produto.nome}</Text>
                  <Text>{itemVenda.quantidade} x R$ {itemVenda.preco_unitario}</Text>
                  <Text>Subtotal: R${itemVenda.subtotal}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  

  const filteredVendas = tipoPagamento
  ? vendas.filter((venda) => venda.tipo_pagamento === tipoPagamento)
  : vendas;

  const calcularTotalVendas = () => {
    let total = 0;
    vendas.forEach((venda) => {
      if (!tipoPagamento || venda.tipo_pagamento === tipoPagamento) {
        total += parseFloat(venda.total);
      }
    });
    return total.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={tipoPagamento}
          onValueChange={(value) => setTipoPagamento(value)}
        >
          <Picker.Item label="Filtrar por tipo de pagamento" value={null} />
          {tiposPagamento.map((tipo, index) => (
            <Picker.Item key={tipo.id} label={tipo.label} value={tipo.value} />
          ))}
        </Picker>
        <Text style={styles.total}>{`Total: R$ ${calcularTotalVendas()}`}</Text>
      </View>
      <FlatList
        data={filteredVendas}
        keyExtractor={(item) => item.id_venda}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MinhaTela;
