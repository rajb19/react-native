import React, { Component } from 'react'
import { Text, TouchableOpacity, Alert } from 'react-native'
import PushNotification from 'react-native-push-notification'
import * as Routes from '../../navigator/routes';

class RemotePushController extends Component {

  componentDidMount() {
    var _this = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token)
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION ==>', notification)
        // Alert.alert("NOTIFICATION ==>", JSON.stringify(notification));
        _this.handleNotification(notification);
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '71200146131',
      popInitialNotification: true,
      requestPermissions: true
    })
  }

  handleNotification = (notification) => {
    console.log('handleNotification ==>', notification)
    const userInteraction = notification.userInteraction
    if (userInteraction) {
      this.props.navigation.navigate(Routes.HOME);
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={() => { this.props.navigation.navigate(Routes.LAOCALNOTIFICATION) }}
        activeOpacity={0.6}
        style={{ backgroundColor: 'grey', alignItems: 'center', margin: 20, padding: 10, borderRadius: 6 }}>
        <Text style={{ color: 'white' }}> Remote Push Notification </Text>
      </TouchableOpacity>
    )
  }
}
export default RemotePushController