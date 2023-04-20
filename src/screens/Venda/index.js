import React, { useState, useEffect } from "react";
import { Text, View, Button, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import Icon from 'react-native-vector-icons/AntDesign'

export default function Venda({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(0);
  const [saidas, setSaidas] = useState([]);
  const [tipoPagamento, setTipoPagamento] = useState(null);
  const [exibirPicker, setExibirPicker] = useState(false);

  useEffect(() => {
    async function buscarProdutos() {
      const response = await fetch("https://backend-estoque-production.up.railway.app/produtos");
      const data = await response.json();

      // Filtra os produtos que têm estoque maior que zero
      const produtosComEstoque = data.filter((produto) => produto.estoque > 0);

      setProdutos(produtosComEstoque);
    }

    buscarProdutos();
  }, []);

  function DetalhesDoProduto({
    produto,
    quantidade,
    onIncrementar,
    onDecrementar,
    onVender,
  }) {
    const subtotal = produto.preco * quantidade;
    return (
      <View style={styles.containerSaida}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.textSaida}>{produto.nome}</Text>
            <Text style={styles.textSaida}>Preço: R$ {produto.preco}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.buttonMenos} onPress={onDecrementar}><Text style={styles.textButton}>-</Text></TouchableOpacity>
            <Text style={styles.textSaida}>{quantidade}</Text>
            <TouchableOpacity style={styles.buttonMais} onPress={onIncrementar}><Text style={styles.textButton}>+</Text></TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.buttonVender} onPress={onVender}><Text style={styles.textButton}>Vender</Text></TouchableOpacity>
          <Text style={styles.textSubtotal}>{`R$ ${subtotal.toFixed(2)}`}</Text>
        </View>
      </View>
    );
  }
  function handleIncrementar() {
    if (quantidade < produtoSelecionado.estoque) {
      setQuantidade(quantidade + 1);
    }
  }

  function handleDecrementar() {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    }
  }

  const handleVender = () => {
    if (quantidade === 0) {
      Alert.alert(
        "Quantidade inválida",
        "Selecione uma quantidade maior que zero"
      );
      return;
    }
    const saida = {
      produto: produtoSelecionado,
      quantidade,
      subtotal: produtoSelecionado.preco * quantidade,
    };
    setSaidas([...saidas, saida]);
    setProdutoSelecionado(null);
    setQuantidade(0);
  };

  function SaidaItem({ saida, onRemover }) {
    const { produto, quantidade, subtotal } = saida;
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor:'#fff', margin: 10, padding:10, borderRadius: 10}}>
  <View style={{flexDirection: 'column'}}>
    <Text>{produto.nome}</Text>
    <Text>Preço: R$ {produto.preco}</Text>
  </View>
  <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
    <Text>Quantidade: {quantidade}</Text>
    <Text>Subtotal: R$ {subtotal.toFixed(2)}</Text>
  </View>
  <TouchableOpacity style={styles.button_remover} title="Remover" onPress={() => onRemover(saida)}>
  <Icon name="closesquare" size={25} color="red"/>
  </TouchableOpacity>
</View>

    );
  }
  console.log(saidas);
  function handleRemoverSaida(saida) {
    setSaidas(saidas.filter((s) => s !== saida));
  }

  async function handleSalvar() {
    if (!tipoPagamento) {
      setExibirPicker(true);
      return;
    }

    if (saidas.length === 0) {
      Alert.alert("Não há vendas a serem salvas");
      return;
    }

    try {
      const response = await fetch("https://backend-estoque-production.up.railway.app/venda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          saidas,
          tipoPagamento,
          total,
        }),
      });
      console.log(response);
      if (response.ok) {
        Alert.alert("Venda realizada com sucesso");
        navigation.goBack();
      } else {
        Alert.alert("Ocorreu um erro, tente novamente");
      }
    } catch (error) {
      Alert.alert("Ocorreu um erro, tente novamente");
    }
  }

  function handleSelecionarTipoPagamento(tipo) {
    setTipoPagamento(tipo);
    setExibirPicker(false);
  }

  const total = saidas.reduce((acc, curr) => acc + curr.subtotal, 0);

  const tiposPagamento = [
    { id: 1, label: "Selecionar", value: null },
    { id: 2, label: "Dinheiro", value: "dinheiro" },
    { id: 3, label: "Cartão de crédito", value: "credito" },
    { id: 4, label: "Cartão de débito", value: "debito" },
    { id: 5, label: "Pix", value: "pix" },
  ];

  // Renderiza o Picker caso tipoPagamento seja nulo e exibirPicker seja true
  const picker = exibirPicker && (
    <View>
      <Text>Selecione um tipo de pagamento:</Text>
      <Picker
        selectedValue={tipoPagamento}
        onValueChange={(itemValue) => setTipoPagamento(itemValue)}
      >
        {tiposPagamento.map((tipo) => (
          <Picker.Item key={tipo.id} label={tipo.label} value={tipo.value} />
        ))}
      </Picker>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Selecione um produto:</Text>
      <Picker
        selectedValue={produtoSelecionado}
        onValueChange={(itemValue) => setProdutoSelecionado(itemValue)}
      >
        <Picker.Item label="Selecione um produto..." value={null} />
        {produtos.map((produto) => (
          <Picker.Item
            key={produto.id_produto}
            label={produto.nome}
            value={produto}
          />
        ))}
      </Picker>
      {produtoSelecionado && (
        <DetalhesDoProduto
          produto={produtoSelecionado}
          quantidade={quantidade}
          onIncrementar={handleIncrementar}
          onDecrementar={handleDecrementar}
          onVender={handleVender}
        />
      )}
      {saidas.map((saida, index) => (
        <SaidaItem key={index} saida={saida} onRemover={handleRemoverSaida} />
      ))}
      <View style={styles.bottomContainer}>
        {picker}
        <Text>Tipo de pagamento: {tipoPagamento || "Selecione"}</Text>

        <Text style={styles.totalText}>
          Total da venda: R$ {total.toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.btn} onPress={handleSalvar}>
          <Text style={styles.text_btn}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
