import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import HomeScreen from "../screens/home";
import SignUpScreen from "../screens/signUp";
import SignInScreen from "../screens/signIn";
import ViewUserScreen from "../screens/viewUser";
import AddUserScreen from "../screens/addUser";
import MobileVerificationScreen from "../screens/mobileVerification";
import LocalNotificationScreen from "../screens/localNotification";
import RemoteNotificationScreen from "../screens/remoteNotification";
import * as Routes from './routes';

const Stack = createStackNavigator();
class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.LAOCALNOTIFICATION}>
          <Stack.Screen name={Routes.HOME} component={HomeScreen} />
          <Stack.Screen name={Routes.SIGNIN} component={SignInScreen} />
          <Stack.Screen name={Routes.SIGNUP} component={SignUpScreen} />
          <Stack.Screen name={Routes.MOBILEVERIFICATION} component={MobileVerificationScreen} />
          <Stack.Screen name={Routes.VIEWUSER} component={ViewUserScreen} />
          <Stack.Screen name={Routes.ADDUSER} component={AddUserScreen} />
          <Stack.Screen name={Routes.LAOCALNOTIFICATION} component={LocalNotificationScreen} />
          <Stack.Screen name={Routes.REMOTENOTIFICATION} component={RemoteNotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;