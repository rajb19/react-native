import { StyleSheet, Dimensions } from "react-native";

// custom imports
import { Colors } from "../../../../common/constants";

const deviceHeight = Dimensions.get('window').height
export default StyleSheet.create({
  container: {
    height: deviceHeight / 2,
    backgroundColor: 'tomato',
    borderRadius: 10
  },
  iconCloseContainer: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconClose: {
    height: 16,
    width: 16,
    tintColor: Colors.WHITE
  },
  placeholderContainer: {
    height: 50,
    width: 50,
    backgroundColor: Colors.GREY,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
  },
  iconPlaceholder: {
    color: Colors.WHITE,
    fontSize: 18
  },
  itemContentContainer: {
    padding: 12,
    flex: 1
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  itemUrl: {
    color: Colors.BLUE,
    textDecorationLine: 'underline'
  },
  textWhite: { color: Colors.WHITE }
})