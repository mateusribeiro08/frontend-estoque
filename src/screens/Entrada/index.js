import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import Icon from "react-native-vector-icons/AntDesign"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Entrada = ({navigation}) => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [entradas, setEntradas] = useState([]);
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    async function buscarProdutos() {
      const response = await fetch("https://backend-estoque-production.up.railway.app/produtos");
      const data = await response.json();
      setProdutos(data);
    }
    buscarProdutos();
  }, []);

  const handleEnviar = async () => {

    const response = await fetch("https://backend-estoque-production.up.railway.app/entrada", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entradas: entradas,
        total: total,
      }),
    });
    console.log(response);
  
    if (!response.ok) {
      throw new Error("Erro ao enviar dados para o servidor");
    }
  
    Alert.alert("Compra realizada com sucesso!");
    navigation.goBack();
  };

  const handleProdutoChange = (produtoId) => {
    setSelectedProduto(produtoId);
  };

  const handleSave = () => {
    if (!preco || !quantidade) {
      alert('Preencha os campos de preço e quantidade');
      return;
    }

    const produto = produtos.find((p) => p.id_produto === selectedProduto);
    const entrada = {
      id_produto: selectedProduto,
      nome_produto: produto.nome,
      preco: preco,
      quantidade: quantidade,
      subtotal: preco * quantidade,
    };
    setEntradas([...entradas, entrada]);
    setSelectedProduto(null);
    setPreco("");
    setQuantidade("");
  };

  const handleRemoveEntry = (index) => {
    const newEntradas = [...entradas];
    newEntradas.splice(index, 1);
    setEntradas(newEntradas);
  };

  const produtoSelecionado = selectedProduto !== null;

  const total = useMemo(() => {
    return entradas.reduce((acc, entrada) => acc + entrada.subtotal, 0);
  }, [entradas]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Picker
          selectedValue={selectedProduto}
          onValueChange={handleProdutoChange}
        >
          <Picker.Item label="Selecione um produto" value={null} />
          {produtos.map((produto) => (
            <Picker.Item
              key={produto.id_produto}
              label={produto.nome}
              value={produto.id_produto}
            />
          ))}
        </Picker>
        {produtoSelecionado && (
          <>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Preço"
              value={preco}
              onChangeText={(text) => setPreco(text)}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Quantidade"
              value={quantidade}
              onChangeText={(text) => setQuantidade(text)}
            />
            <Button title="Adicionar" onPress={handleSave} />
          </>
        )}
        <View style={styles.entradas}>
          <Text style={styles.entradasTitle}>Entradas:</Text>
          {entradas.map((entrada, index) => (
            <View key={index} style={styles.entrada}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <View style={{ flex: 1 }}>
      <Text style={styles.entradaText}>{entrada.nome_produto}</Text>
      <Text style={styles.entradaText}>Subtotal: {(entrada.preco * entrada.quantidade).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>
    </View>
    <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
      <Text style={styles.entradaText}>Preço: R${entrada.preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>
      <Text style={styles.entradaText}>Quantidade: {entrada.quantidade}</Text>
    </View>
    <TouchableOpacity style={styles.button_remover} title="Remover" onPress={() => handleRemoveEntry(index)}>
      <Icon name="closesquare" size={25} color="red"/>
    </TouchableOpacity>
  </View>
</View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
          <Text style={styles.totalText}>
            Total: R${" "}
            {total.toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </Text>
          <TouchableOpacity style={styles.btn} title="Salvar" onPress={handleEnviar}>
            <Text style={styles.text_btn}>Salvar</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Entrada;
