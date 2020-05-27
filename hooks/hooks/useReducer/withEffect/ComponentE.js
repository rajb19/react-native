import React from "react";
import { View, Text } from "react-native";
import ComponentF from "./ComponentF";


function ComponentE() {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ComponentF />
    </View>
  )
}

export default ComponentE;