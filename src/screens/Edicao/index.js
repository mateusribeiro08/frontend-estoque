import React, { useState, useEffect } from 'react';
import { View, Alert, TextInput, Text, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles'

const Edicao = ({navigation}) => {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [detalhes, setDetalhes] = useState('');

  useEffect(() => {
    async function buscarProdutos() {
      const response = await fetch('https://backend-estoque-production.up.railway.app/produtos');
      const data = await response.json();
      setProdutos(data);
    }
    buscarProdutos();
  }, []);

  const onChangeProduto = (itemValue, itemIndex) => {
    const produto = produtos.find((p) => p.id_produto === itemValue);
    setProdutoSelecionado(produto);
  };
  
  useEffect(() => {
    if (produtoSelecionado) {
      setNome(produtoSelecionado.nome);
      setDescricao(produtoSelecionado.descricao);
      setPreco(produtoSelecionado.preco.toString());
      setFornecedor(produtoSelecionado.fornecedor);
      setDetalhes(produtoSelecionado.detalhes);
    }
  }, [produtoSelecionado]);

  const atualizarProduto = async (produto) => {
    try {
      const response = await fetch('http://10.0.0.104:3500/edicao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      });
  
      const data = await response.json();
      console.log(data);
      Alert.alert(
        'Produto atualizado',
        'O produto foi atualizado com sucesso!',
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    } catch (error) {
      console.error(error);
    }
  };
  

  const salvar = () => {
    // atualizar o produto selecionado com os novos valores
    if (produtoSelecionado) {
      const novoProduto = {
        id_produto: produtoSelecionado.id_produto,
        nome,
        descricao,
        preco,
        fornecedor,
        detalhes
      };
      atualizarProduto(novoProduto);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={produtoSelecionado?.id_produto}
        onValueChange={onChangeProduto}
        mode='dropdown'
      >
        {produtos.map((produto) => (
          <Picker.Item
            key={produto.id_produto}
            label={produto.nome}
            value={produto.id_produto}
          />
        ))}
      </Picker>
      {produtoSelecionado && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
          />
          <TextInput
            style={styles.input}
            placeholder="Fornecedor"
            value={fornecedor}
            onChangeText={setFornecedor}
          />
          <TextInput
            style={styles.input}
            placeholder="Detalhes"
            value={detalhes}
            onChangeText={setDetalhes}
          />
          <TouchableOpacity style={styles.button} onPress={salvar}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Edicao;




