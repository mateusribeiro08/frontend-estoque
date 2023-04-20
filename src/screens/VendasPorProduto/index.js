import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [itensVenda, setItensVenda] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch('https://backend-estoque-production.up.railway.app/produtos');
        const json = await response.json();
        setProdutos(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProdutos();
  }, []);

  useEffect(() => {
    async function fetchItensVenda() {
      try {
        const response = await fetch('https://backend-estoque-production.up.railway.app/itens_venda');
        const json = await response.json();
        setItensVenda(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchItensVenda();
  }, [itensVenda]);

  function handleProdutoSelecionado(produtoId) {
    setProdutoSelecionado(produtoId);
    const itensFiltrados = itensVenda.filter((item) => item.id_produto === produtoId);
    const subtotalItens = itensFiltrados.reduce((total, item) => total + parseFloat(item.subtotal), 0);
    setTotal(subtotalItens);
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Selecione um produto:</Text>
        <Picker
          selectedValue={produtoSelecionado}
          onValueChange={(value) => handleProdutoSelecionado(value)}
        >
          <Picker.Item label="Selecione um produto" value={null} />
          {produtos.map((produto) => (
            <Picker.Item key={produto.id_produto} label={produto.nome} value={produto.id_produto} />
          ))}
        </Picker>
      </View>
      {produtoSelecionado && (
  <>
    <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Itens de venda:</Text>
    {itensVenda.filter((item) => item.id_produto === produtoSelecionado).length > 0 ? (
      <FlatList
        data={itensVenda.filter((item) => item.id_produto === produtoSelecionado)}
        keyExtractor={(item) => item.id_item_venda}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Código da Venda: {item.id_venda}</Text>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <Text style={styles.text}>{item.quantidade} x {item.preco_unitario}</Text>
              <Text style={styles.text}>Subtotal: R${item.subtotal}</Text>
            </View>
          </View>
        )}
      />
    ) : (
      <Text style={{ fontWeight: 'bold', fontSize: 17}}>Este produto ainda não foi vendido</Text>
    )}
    <Text style={{ fontWeight: 'bold', marginTop: 8 }}>Total: R${total.toFixed(2)}</Text>
  </>
)}
    </View>
  );
}
