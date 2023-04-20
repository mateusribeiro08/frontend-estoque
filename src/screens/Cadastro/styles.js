import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#CEFAF4',
  },
  title: {
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    backgroundColor: '#043565',
    color: '#fff',
    borderRadius: 25,
    fontWeight: 'bold',
    fontSize: 20
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
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#57B8FF',
    margin: 10,
    width: 160,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3
  },
  buttonText: {
    color: '#043565',
    fontWeight: 'bold',
  },
});
 export default styles;