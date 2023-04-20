import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CEFAF4',
    padding: 10
},
input: {
  marginBottom: 20,
  height: 40,
  borderColor: '#ccc',
  borderWidth: 2,
  paddingHorizontal: 10,
  borderRadius: 5,
  backgroundColor: '#fff'
},
entradasTitle: {
  fontSize: 16,
  fontWeight: 'bold'
},
entrada: {
  margin: 10,
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 15
},
button_remover: {
  marginLeft: 30
},
bottomContainer: {
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