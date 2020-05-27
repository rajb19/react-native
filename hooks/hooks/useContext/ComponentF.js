import React from "react";
import { View, Text } from "react-native";
import { UserContext, ChannelContext } from "../../App";

function ComponentF() {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <UserContext.Consumer>
        {
          user => {
            return (
              <ChannelContext.Consumer>
                {
                  channel => {
                    return (
                      <Text>User Context Value {user}, Channel Context value {channel}</Text>
                    )
                  }
                }
              </ChannelContext.Consumer>
            )
          }
        }
      </UserContext.Consumer>
    </View>
  )
}

export default ComponentF;