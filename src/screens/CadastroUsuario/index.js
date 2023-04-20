import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import axios from 'axios';

const CadastroUsuario = ({ navigation }) => {
  const [user, setUser] = useState({
    nome: "",
    senha: "",
    email: "",
  });

  const handleSave = () => {
    fetch("https://backend-estoque-production.up.railway.app/cadastroUsuario", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Não foi possível cadastrar o usuário.");
        }
        Alert.alert("Cadastro", "Usuário cadastrado com sucesso!");
        navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Erro", error.message);
      });
  };
  

  return (
    <View style={styles.container}>
  <TextInput
    style={styles.input}
    placeholder="Nome"
    onChangeText={(text) => setUser({ ...user, nome: text })}
  />

  <TextInput
    style={styles.input}
    placeholder="Senha"
    onChangeText={(text) => setUser({ ...user, senha: text })}
    secureTextEntry={true}
  />

  <TextInput
    style={styles.input}
    placeholder="Email"
    onChangeText={(text) => setUser({ ...user, email: text })}
  />

  <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
    <Text style={styles.buttonText}>Salvar</Text>
  </TouchableOpacity>
</View>

  );
};

export default CadastroUsuario;
