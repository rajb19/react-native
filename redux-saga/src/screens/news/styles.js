import { StyleSheet } from "react-native";
import { Colors } from "../../common/constants";

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white'
  },
  itemContainer: {
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    height: 100,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  itemImage: {
    flex: 1,
    borderRadius: 6
  },
  itemContent: {
    width: '60%',
    padding: 4
  },
  itemAuthor: {
    color: Colors.ORANGE,
    fontSize: 16
  },
  itemTitle: {
    color: Colors.BLACK,
    fontSize: 14
  }
})