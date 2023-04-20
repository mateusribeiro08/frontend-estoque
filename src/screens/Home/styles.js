import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CEFAF4'
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    width: 160,
    height: 160,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonVenda: {
    backgroundColor: "#4ADB40",
  },
  buttonCadastro: {
    backgroundColor: "#DC2B20",
  },
  buttonEntrada: {
    backgroundColor: "#5270F2",
  },
  buttonEdicao: {
    backgroundColor: "#FAEA3C",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  rodape: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#043565',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  stockButton: {
    marginRight: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#57B8FF'
  },
  stockButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
