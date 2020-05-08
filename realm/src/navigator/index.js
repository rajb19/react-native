import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// list of screen components
import SignIn from '../screens/signIn';
import ForgotPassword from '../screens/forgotPassword';
import SignUp from '../screens/signUp';
import Home from '../screens/home';
import Profile from '../screens/profile';

// custom imports
import * as Routes from "./routes";
import styles from "./styles";
import { Colors } from '../common/constants';

const Stack = createStackNavigator();
const OPTIONS = {
  headerTintColor: Colors.WHITE,
  headerStyle: styles.headerStyle,
  headerTitleStyle: styles.headerTitleStyle,
}
class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  appStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={Routes.HOME}
        screenOptions={OPTIONS}>
        <Stack.Screen name={Routes.HOME} component={Home} />
        <Stack.Screen name={Routes.PROFILE} component={Profile} />
      </Stack.Navigator>
    );
  };

  authStack = () => {
    return (
      <Stack.Navigator headerMode="screen" initialRouteName={Routes.SignIn}
        screenOptions={OPTIONS}>
        <Stack.Screen name={Routes.SIGNIN} component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name={Routes.SIGNUP} component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name={Routes.FORGOTPASSWORD} component={ForgotPassword}
          options={{ title: 'Forgot Password' }} />
      </Stack.Navigator>
    );
  };

  render() {
    return (
      <NavigationContainer>
        {!this.props.isLoggedIn ? this.authStack() : this.appStack()}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, null)(AppNavigator);