import { StyleSheet, Dimensions } from "react-native";

// custom imports
import { Colors } from "../../common/constants";

const deviceHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {},
  contentContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10
  },
  filterContainer: {
    justifyContent: "flex-end",
    flexDirection: 'row',
    marginVertical: 8
  },
  filterIcon: {
    height: 20,
    width: 20,
    tintColor: Colors.GREY
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.GAINSBORO,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  itemIconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GREY,
    borderRadius: 20,
  },
  iconPlaceholder: {
    color: Colors.WHITE,
    fontSize: 14
  },
  itemContentContainer: {
    width: '85%',
    marginHorizontal: 6
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3
  },
  itemTitle: { fontWeight: 'bold' },
  itemUrl: {
    color: Colors.BLUE,
    textDecorationLine: 'underline'
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalWrapper: {
    backgroundColor: Colors.WHITE,
    height: deviceHeight / 4,
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
  modalHeaderContainer: {
    height: 50,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    tintColor: Colors.GREY
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  colorGrey: {
    color: Colors.GREY
  },
  padding: {
    padding: 10
  }
})