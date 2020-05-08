import { StyleSheet } from "react-native";
import { Colors } from "../../common/constants";


export default StyleSheet.create({
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});