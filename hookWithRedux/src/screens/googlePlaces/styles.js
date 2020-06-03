import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: 40,
  },
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listImageContainer: {
    width: '10%',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  listItemIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    tintColor: 'black'
  }
});