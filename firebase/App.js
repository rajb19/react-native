import React from 'react';
import AppNavigator from './src/navigator';
import PushNotification from "react-native-push-notification";

class App extends React.Component {

  componentDidMount() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token)
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION ==>', notification)
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '71200146131',
      popInitialNotification: true,
      requestPermissions: true
    })
  }

  render() {
    return (
      <AppNavigator />
    );
  }
};

export default App;