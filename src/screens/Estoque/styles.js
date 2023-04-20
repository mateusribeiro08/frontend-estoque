import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CEFAF4',
    alignItems: 'center',
    justifyContent: 'center',
},
header: {
  flexDirection: 'row'
},
shearchBar: {
  marginTop:20,
  paddingHorizontal: 10,
  height: 50,
  width: 320,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 5,
  backgroundColor: '#fff'
},
icon_list: {
  marginTop: 25,
  marginLeft: 5
},
list: {
  margin: 20
},
item_list: {
  flexDirection: 'row',
  paddingHorizontal: 10,
  paddingTop: 5,
  height: 50,
  width: 340,
  margin: 10,
  backgroundColor: '#fff',
  borderRadius: 10
},
nome: {
  fontSize: 17,
  marginTop: 5,
  fontWeight: 'bold'
},
preco :{
  fontSize:17,
  marginTop: 5,
  marginLeft: 10
},
estoque: {
  position: 'absolute',
  right: 40,
  top:10,
  marginLeft: 20
},
icon_item: {
  position: 'absolute',
  right: 10,
  top: 10
}
})

export default styles