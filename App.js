import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Login,
  Home,
  Cadastro,
  Venda,
  Entrada,
  Estoque,
  Edicao,
  CadastroUsuario,
  ListaCompra,
  ListaVenda,
  VendasPorProduto,
} from "./src/screens";
import { StatusBar } from "expo-status-bar";
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
          headerStyle: { backgroundColor: "#043565" },
          headerTintColor: "white", // Define a cor de fundo do cabeçalho
        }}
      />
      <Drawer.Screen
        name="Histórico de Compras"
        component={ListaCompra}
        options={{
          headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
          headerStyle: { backgroundColor: "#043565" },
          headerTintColor: "white", // Define a cor de fundo do cabeçalho
        }}
      />
      <Drawer.Screen
        name="Histórico de Vendas"
        component={ListaVenda}
        options={{
          headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
          headerStyle: { backgroundColor: "#043565" },
          headerTintColor: "white", // Define a cor de fundo do cabeçalho
        }}
      />
      <Drawer.Screen
        name="Vendas por Produto"
        component={VendasPorProduto}
        options={{
          headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
          headerStyle: { backgroundColor: "#043565" },
          headerTintColor: "white", // Define a cor de fundo do cabeçalho
        }}
      />
    </Drawer.Navigator>
  );
}

function App() {

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastrar Usuário"
          component={CadastroUsuario}
          options={{
            headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
            headerStyle: { backgroundColor: "#043565" },
            headerTintColor: "white", // Define a cor de fundo do cabeçalho
          }}
        />
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastrar Produto"
          component={Cadastro}
          options={{
            headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
            headerStyle: { backgroundColor: "#043565" },
            headerTintColor: "white", // Define a cor de fundo do cabeçalho
          }}
        />
        <Stack.Screen
          name="Entrada de Mercadoria"
          component={Entrada}
          options={{
            headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
            headerStyle: { backgroundColor: "#043565" },
            headerTintColor: "white", // Define a cor de fundo do cabeçalho
          }}
        />
        <Stack.Screen
          name="Editar Produto"
          component={Edicao}
          options={{
            headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
            headerStyle: { backgroundColor: "#043565" },
            headerTintColor: "white", // Define a cor de fundo do cabeçalho
          }}
        />
        <Stack.Screen
          name="Realizar Venda"
          component={Venda}
          options={{
            headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
            headerStyle: { backgroundColor: "#043565" },
            headerTintColor: "white", // Define a cor de fundo do cabeçalho
          }}
        />
        <Stack.Screen
          name="Estoque"
          component={Estoque}
          options={{
            headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
            headerStyle: { backgroundColor: "#043565" },
            headerTintColor: "white", // Define a cor de fundo do cabeçalho
          }}
        />
        <Stack.Screen name="Histórico de Compras" component={ListaCompra} />
        <Stack.Screen name="Histórico de Vendas" component={ListaVenda} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
