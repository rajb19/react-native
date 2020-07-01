import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from 'react-native-google-signin';
import CustomButton from './components/CustomButton';

const GoogleSignIn = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log('useEffect ');

    GoogleSignin.configure({
      // scopes: ['openid', 'email', 'profile'],
    });
    getCurrentUser();
  }, []);

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser) setIsLoggedIn(true);
    console.log('getCurrentUser:', currentUser);
  };

  signIn = async () => {
    // console.log('signIn: ');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setCurrentUser(userInfo);
      setIsLoggedIn(true);
      console.log('signIn userInfo:', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  signOut = async () => {
    console.log('signOut');
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setCurrentUser({});
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return isLoggedIn ? (
    <CustomButton handelLogOut={signOut} />
  ) : (
    <GoogleSigninButton
      style={{alignSelf: 'center', width: 230, height: 48}}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={isLoggedIn}
    />
  );
};

export default GoogleSignIn;
