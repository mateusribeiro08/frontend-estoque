import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: '#043565',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 3
  },
  button: {
    backgroundColor: '#57B8FF',
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    elevation: 3
  },
  buttonText: {
    color: '#043565',
    fontWeight: 'bold',
  },
});
 export default styles;