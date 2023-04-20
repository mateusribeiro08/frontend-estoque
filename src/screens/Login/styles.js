import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view_total: {
    paddingTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  darkbg: {
    backgroundColor: '#043565'
  },
  login_logo: {
    marginBottom: 10
  },
  img_logo: {
    marginTop: 40,
    marginBottom: 10,
    height: 200,
    width: 200,
    borderRadius: 5
  },
status: {
  color: 'red', 
  fontWeight: 'bold',
  fontSize: 18,
  marginBottom: 10
},
  login_form: {
    width: '80%'
  },
  login_input: {
    backgroundColor: '#fff',
    fontSize: 19,
    padding: 7,
    marginBottom: 10,
    borderRadius: 5
  },
  login_button: {
    padding: 12,
    backgroundColor: '#57B8FF',
    alignSelf: 'center',
    borderRadius: 5
  },
  login_textButton: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#333'
  },
  view_trocaSenha: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  text_trocaSenha: {
    color: '#fff',
    fontSize: 16
  }
})

export default styles