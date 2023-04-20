import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Modal, Alert, BackHandler } from 'react-native';
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconF from 'react-native-vector-icons/FontAwesome5'

export default function HomeScreen({ navigation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
    const backAction = () => {
      Alert.alert('Confirmação', 'Tem certeza que deseja sair?', [
        {
          text: 'Cancelar',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Sim', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.button,styles.buttonVenda]}
            onPress={() => navigation.navigate('Realizar Venda')}
          >
            <IconF name="shopping-cart" size={80} color="#fff" />
            <Text style={styles.buttonText}>REALIZAR VENDA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonEntrada]}
            onPress={() => navigation.navigate('Entrada de Mercadoria')}
          > 
          <IconF name="arrow-alt-circle-up" size={80} color="#fff" />
          <Text style={styles.buttonText}>ENTRADA DE MERCADORIA</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonEdicao]}
            onPress={() => navigation.navigate('Editar Produto')}
          > 
          <IconF name="pen-square" size={80} color="#fff" />
          <Text style={styles.buttonText}>EDITAR PRODUTO</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonCadastro]}
            onPress={() => navigation.navigate('Cadastrar Produto')}
          >
            <IconF name="plus-circle" size={80} color="#fff" />
            <Text style={styles.buttonText}>CADASTRAR PRODUTO</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rodape}>
        <TouchableOpacity
          style={styles.stockButton}
          onPress={() => navigation.navigate('Estoque')}
        >
          <Text style={styles.stockButtonText}>Mostrar Estoque</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}
