import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CEFAF4',
},
item: {
  backgroundColor: '#fff',
  flexDirection: 'row',
  margin: 10,
  padding: 10,
  justifyContent: 'space-between',
  borderRadius: 10
},
itemDetalhes: {
  backgroundColor: '#fff',
  marginHorizontal: 10,
  marginTop: -15,
  padding: 10,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10
},
itemDetalhesTitulo: {
  fontWeight: 'bold',
},
itemDetalhesText: {
  marginBottom: 10
}

})

export default styles