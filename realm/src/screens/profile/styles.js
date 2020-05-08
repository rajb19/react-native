import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    textAlign: 'center',
    flex: 1,
    alignSelf: 'center',
    width: '90%',
  },
  inputContainer: {
    flex: 1,
    marginVertical: 20
  },
  headingContainer: {
    flex: 1,
    paddingTop: 60
  },
  headingText: {
    fontSize: 22
  },
  commonPadding: {
    paddingLeft: 4,
  },
  inputView: {
    marginVertical: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    paddingLeft: 4,
    marginTop: 2,
    height: 40,
  },
  loginBtn: {
    justifyContent: 'center',
    backgroundColor: 'grey',
    alignItems: 'center',
    marginTop: 20,
    height: 40,
    borderRadius: 6,
    width: '70%',
    alignSelf: 'center'
  },
  forgotLinkContainer: {
    width: '70%',
  },
  touchbleArea: {
    alignItems: 'flex-end',
    marginTop: 6
  },
  signUpLinkContainer: {
    marginTop: 30,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  signUpLink: {
    paddingLeft: 4,
    textDecorationLine: "underline"
  },
  loginText: {
    fontSize: 14,
    color: 'white',
  },
  errorText: {
    marginTop: 1,
    fontSize: 12,
    color: 'red',
  },
});
