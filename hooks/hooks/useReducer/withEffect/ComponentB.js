import React from "react";
import { View } from "react-native";
import ComponentD from "./ComponentD";

function ComponentB() {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ComponentD />
    </View>
  )
}

export default ComponentB;