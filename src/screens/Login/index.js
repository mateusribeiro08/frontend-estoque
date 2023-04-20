import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);
  const [status, setStatus] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogin = async () => {
    console.log('oi');
    setIsRefreshing(true);
    fetch('https://backend-estoque-production.up.railway.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    })
    .then(async (response) => {
      if (response.ok) {
        navigation.navigate('Root');
      } else {
        setStatus('Nome de usuário ou senha inválidos');
      }
    })
    .catch(error => {
      console.error(error);
      setStatus('Erro ao fazer login');
    })
    .finally(() => {
      setIsRefreshing(false);
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, styles.darkbg]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.view_total}>
          <View style={styles.login_logo}>
            <Image
              source={require("../../../assets/img/logo.jpg")}
              style={styles.img_logo}
            />
          </View>
          {status ? <Text style={styles.status}>{status}</Text> : null}
          <RefreshControl refreshing={isRefreshing} onRefresh={() => {}} />
          <View style={styles.login_form}>
            <TextInput
              style={styles.login_input}
              placeholder="Email:"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.login_input}
              placeholder="Senha:"
              onChangeText={(text) => setSenha(text)}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.view_trocaSenha}>
            <Text style={styles.text_trocaSenha}>Esqueceu sua senha?</Text>
            <TouchableOpacity onPress={() =>{navigation.navigate("Cadastrar Usuário")}}><Text style={styles.text_trocaSenha}>Cadastrar</Text></TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.login_button}
              onPress={() => handleLogin()}
            >
              <Text style={styles.login_textButton}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
