import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  headingText: {
    fontSize: 20,
    color: 'grey'
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
    alignSelf: 'center'
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderRadius: 4
  },
  button: {
    backgroundColor: 'grey',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '60%',
    borderRadius: 6
  },
  buttonText: { color: 'white' },
  signUpLinkContainer: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  signUpLink: {
    paddingLeft: 4,
    textDecorationLine: "underline"
  }
});