import React, { Component } from 'react'
import { Text, View } from 'react-native'

class FirebasePushNotification extends Component {

  render() {
    const { data } = this.props.route.params;
    return (
      <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 20 }}>
        <Text>{data.firstname} </Text>
        <Text>{data.lastname}</Text>
      </View>
    )
  }
}

export default FirebasePushNotification