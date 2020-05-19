import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Home from "../screens/home";
import SignUp from "../screens/signUp";
import SignIn from "../screens/signIn";
import ViewUser from "../screens/viewUser";
import AddUser from "../screens/addUser";
import MobileVerification from "../screens/mobileVerification";
import * as Routes from './routes';

const Stack = createStackNavigator();
class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.SIGNIN}>
          <Stack.Screen name={Routes.HOME} component={Home} />
          <Stack.Screen name={Routes.SIGNIN} component={SignIn} />
          <Stack.Screen name={Routes.SIGNUP} component={SignUp} />
          <Stack.Screen name={Routes.MOBILEVERIFICATION} component={MobileVerification} />
          <Stack.Screen name={Routes.VIEWUSER} component={ViewUser} />
          <Stack.Screen name={Routes.ADDUSER} component={AddUser} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;