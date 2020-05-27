import React from "react";
import { View } from "react-native";
import ComponentE from "./ComponentE";

function ComponentC() {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ComponentE />
    </View>
  )
}

export default ComponentC;