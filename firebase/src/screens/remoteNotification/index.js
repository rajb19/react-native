import React, { Component } from 'react'
import { Text, View } from 'react-native'
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
      <View style={{ alignItems: 'center' }} >
        <Text> Remote Push Notification </Text>
      </View>
    )
  }
}
export default RemotePushController