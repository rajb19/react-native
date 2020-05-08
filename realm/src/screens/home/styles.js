import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 20;

export default StyleSheet.create({
  headerContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  left: {
    marginLeft: 10
  },
  right: {
    marginRight: 10
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "white"
  },
  container: {
    flex: 1,
  },
  searchBarContainer: {
    height: 40,
    marginHorizontal: 20,
    position: 'absolute',
    top: 10,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1
  },
  searchBarTouchable: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  searchIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  markerIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    borderRadius: 6,
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});