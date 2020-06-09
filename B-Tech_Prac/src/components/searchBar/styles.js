import { StyleSheet } from "react-native";

// custom imports
import { Colors } from "../../common/constants";

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: Colors.GREY,
    borderRadius: 20,
    borderWidth: 1,
    height: 40
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50
  },
  inputContainer: {
    flex: 1,
    color: Colors.BLACK,
  },
  iconSearch: {
    height: 20,
    width: 20,
  },
});