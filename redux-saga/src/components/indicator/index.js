import React from "react";
import { View, ActivityIndicator } from "react-native";

// custom imports
import styles from "./styles";

function Indicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating size={'small'} />
    </View>
  )
}

export default Indicator;

