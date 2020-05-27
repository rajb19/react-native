import React from "react";
import { SafeAreaView } from "react-native";
import ComponentE from "./ComponentE";

function ComponentC() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <ComponentE />
    </SafeAreaView>
  )
}

export default ComponentC;