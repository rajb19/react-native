import React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';

// screens
import HomeScreen from "../screens/home";
import SignUpScreen from "../screens/signUp";
import SignInScreen from "../screens/signIn";
import ViewUserScreen from "../screens/viewUser";
import AddUserScreen from "../screens/addUser";
import MobileVerificationScreen from "../screens/mobileVerification";
import LocalNotificationScreen from "../screens/localNotification";
import RemoteNotificationScreen from "../screens/remoteNotification";
import FirebaseNotificationScreen from "../screens/firebaseNotification";
import * as Routes from './routes';

const Stack = createStackNavigator();
class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await messaging().registerDeviceForRemoteMessages();
    const granted = await messaging().requestPermission({
      alert: true,
      announcement: false,
      badge: true,
      carPlay: true,
      provisional: false,
      sound: true,
    });
    if (granted) {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken);
      console.log('User granted messaging permissions!');
    } else {
      console.log('User declined messaging permissions :(');
    }

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('getInitialNotification: Notification caused app to open from quit state:', remoteMessage);
          this.handleNotification(remoteMessage);
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: Notification caused app to open from background state:', remoteMessage);
      this.handleNotification(remoteMessage);
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('setBackgroundMessageHandler: Message handled in the background!', remoteMessage);
      this.handleNotification(remoteMessage);
    });

    messaging().onMessage(async remoteMessage => {
      console.log('onMessage: A new FCM message arrived!', remoteMessage);
      this.handleNotification(remoteMessage);
    });
  }

  handleNotification = (notification) => {
    Alert.alert(
      notification.notification.title,
      notification.notification.body,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            console.log('Okay Pressed')
            this.navigationRef.navigate(Routes.FIREBASENOTIFICATION, { data: notification.data });
          }
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <NavigationContainer ref={(ref) => this.navigationRef = ref} >
        <Stack.Navigator initialRouteName={Routes.HOME}>
          <Stack.Screen name={Routes.HOME} component={HomeScreen} />
          <Stack.Screen name={Routes.SIGNIN} component={SignInScreen} />
          <Stack.Screen name={Routes.SIGNUP} component={SignUpScreen} />
          <Stack.Screen name={Routes.MOBILEVERIFICATION} component={MobileVerificationScreen} />
          <Stack.Screen name={Routes.VIEWUSER} component={ViewUserScreen} />
          <Stack.Screen name={Routes.ADDUSER} component={AddUserScreen} />
          <Stack.Screen name={Routes.LAOCALNOTIFICATION} component={LocalNotificationScreen} />
          <Stack.Screen name={Routes.REMOTENOTIFICATION} component={RemoteNotificationScreen} />
          <Stack.Screen name={Routes.FIREBASENOTIFICATION} component={FirebaseNotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;