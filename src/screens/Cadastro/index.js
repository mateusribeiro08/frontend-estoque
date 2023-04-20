import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import styles from "./styles";

const Cadastro = ({ navigation }) => {
  const [product, setProduct] = useState({
    nome: "",
    descricao: "",
    detalhes: "",
    fornecedor: "",
    preco: "",
    estoque: "0",
  });

  const handleSave = async () => {
    try {
      const response = await fetch("https://backend-estoque-production.up.railway.app/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      Alert.alert("Cadastro", "Produto cadastrado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar o produto.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={(text) => setProduct({ ...product, nome: text })}
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Descrição"
        onChangeText={(text) => setProduct({ ...product, descricao: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Detalhes"
        onChangeText={(text) => setProduct({ ...product, detalhes: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Fornecedor"
        onChangeText={(text) => setProduct({ ...product, fornecedor: text })}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Preço"
        onChangeText={(text) => setProduct({ ...product, preco: text })}
      />
      <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cadastro;
