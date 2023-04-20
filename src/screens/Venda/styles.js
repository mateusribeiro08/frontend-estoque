import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CEFAF4',
},
containerSaida: {
  margin: 10
},
textSaida: {
  marginBottom: 5
},
buttonMenos: {
  marginRight: 10,
  paddingLeft: 10,
  backgroundColor: 'red',
  height: 30,
  width: 30,
  alignItens: 'center',
  justifyContent: 'center',
  borderRadius: 5
},
buttonMais: {
  marginRight: 10,
  marginLeft: 10,
  paddingLeft: 10,
  backgroundColor: 'green',
  height: 30,
  width: 30,
  alignItens: 'center',
  justifyContent: 'center',
  borderRadius: 5
},
textButton: {
  color: '#fff',
  fontWeight: 'bold',
},
buttonVender: {
  backgroundColor: '#57B8FF',
  paddingHorizontal: 30,
  paddingVertical: 10,
  borderRadius: 10
},
textSubtotal: {
  marginTop: 10,
  marginRight: 10,
  fontSize: 15,
  fontWeight: 'bold'

},
itemLista: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
button_remover: {
  marginTop: 10,
},
bottomContainer: {
  position: 'absolute',
  left: 100,
  bottom: 10,
  marginBottom: 20,
  alignItems: 'center',
  justifyContent: 'center'
},
btn: {
  width:'60%',
  backgroundColor: '#57B8FF',
  marginVertical:30,
  marginHorizontal:20,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 25,
},
totalText: {
  fontSize: 17,
  fontWeight: 'bold'
},
text_btn: {
  alignSelf: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  color: '#043565'
}
})

export default styles