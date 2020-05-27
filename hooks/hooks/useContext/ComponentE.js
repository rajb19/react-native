import React, { useContext } from "react";
import { View, Text } from "react-native";
import { UserContext, ChannelContext } from "../../App";
import ComponentF from "./ComponentF";

function ComponentE() {
  const user = useContext(UserContext);
  const channel = useContext(ChannelContext);
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {/* <ComponentF /> */}
      <Text>User Context Value {user}, Channel Context value {channel}</Text>
    </View>
  )
}

export default ComponentE;