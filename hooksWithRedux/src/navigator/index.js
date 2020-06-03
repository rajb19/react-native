import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// list of screen components
import SignIn from '../screens/signIn';
import ForgotPassword from '../screens/forgotPassword';
import SignUp from '../screens/signUp';
import Home from '../screens/home';
import Profile from '../screens/profile';
import GooglePlaces from '../screens/googlePlaces';

// custom imports
import * as Routes from './routes';
import styles from './styles';
import {Colors} from '../common/constants';

const Stack = createStackNavigator();
const OPTIONS = {
  headerTintColor: Colors.WHITE,
  headerStyle: styles.headerStyle,
  headerTitleStyle: styles.headerTitleStyle,
};

function AppNavigator() {
  const auth = useSelector((state) => state.auth);

  appStack = () => {
    return (
      <Stack.Navigator initialRouteName={Routes.HOME} screenOptions={OPTIONS}>
        <Stack.Screen name={Routes.HOME} component={Home} />
        <Stack.Screen name={Routes.PROFILE} component={Profile} />
        <Stack.Screen name={Routes.GOOGLEPLACES} component={GooglePlaces} />
      </Stack.Navigator>
    );
  };

  authStack = () => {
    return (
      <Stack.Navigator
        headerMode="screen"
        initialRouteName={Routes.SignIn}
        screenOptions={OPTIONS}>
        <Stack.Screen
          name={Routes.SIGNIN}
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.SIGNUP}
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.FORGOTPASSWORD}
          component={ForgotPassword}
          options={{title: 'Forgot Password'}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {!auth.isLoggedIn ? this.authStack() : this.appStack()}
    </NavigationContainer>
  );
}

export default AppNavigator;
