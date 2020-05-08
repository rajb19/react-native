import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '80%',
  },
  inputView: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  headingContainer: {
    flex: 1,
    marginVertical: 40
  },
  headingText: {
    fontSize: 22
  },
  commonPadding: {
    paddingLeft: 4,
  },
  resetButton: {
    justifyContent: 'center',
    backgroundColor: 'grey',
    alignItems: 'center',
    marginTop: 30,
    height: 40,
    borderRadius: 6,
    width: '70%',
    alignSelf: 'center'
  },
  resetText: {
    fontSize: 14,
    color: 'white',
  },
  textInput: {
    borderBottomWidth: 1,
    paddingLeft: 4,
    marginTop: 2,
    height: 40,
  },
  sendButton: {
    justifyContent: 'center',
    backgroundColor: 'grey',
    alignItems: 'center',
    marginTop: 60,
    height: 40,
    borderRadius: 6,
    width: '70%',
    alignSelf: 'center'
  },
  sendText: {
    fontSize: 14,
    color: 'white',
  },
  errorText: {
    marginTop: 1,
    fontSize: 12,
    color: 'red',
  },
});