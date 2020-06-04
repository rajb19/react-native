/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// custom imports
import {validateEmail, checkEmpty} from '../../common/utility';
import {Constants} from '../../common/constants';
import {LoginAction} from '../../redux/actions';
import * as Routes from '../../navigator/routes';
import styles from './styles';

const SignIn = () => {
  let emailRef = useRef(null);
  let passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const auth = useSelector((state) => state.auth);
  const {users, success, error} = useSelector((state) => ({
    users: state.auth.users,
    success: state.auth.success,
    error: state.auth.error,
  }));

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      console.log('2');
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
    });

    if (showMessage && error !== '') Toast.show(error);
    if (showMessage && success !== '') Toast.show(success);

    return () => {
      focus;
      setShowMessage(false);
    };
  }, [showMessage]);

  handleLoginAction = async () => {
    if (!checkEmpty(email)) {
      setEmailError(Constants.BLANKNOTALLOWD);
      setPasswordError('');
      return false;
    } else if (!validateEmail(email)) {
      setEmailError(Constants.INVALIDEMAIL);
      setPasswordError('');
      return false;
    } else if (!checkEmpty(password)) {
      setEmailError('');
      setPasswordError(Constants.BLANKNOTALLOWD);
      return false;
    } else {
      setEmailError('');
      setPasswordError('');
      await dispatch(LoginAction(email, password, users));
      setShowMessage(true);
      // if (auth.error !== '') {
      //   Toast.show(auth.error);
      // }
      // if (auth.success !== '') {
      //   Toast.show(auth.success);
      // }
    }
  };

  renderError = (error) => {
    return (
      <View>
        <Text style={[styles.commonPadding, styles.errorText]}>{error}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        style={styles.mainContainer}
        contentContainerStyle={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Hello There,</Text>
            <Text style={styles.headingText}>Welcome back</Text>
          </View>
          <View style={{flex: 3}}>
            {/* textinput container for email */}
            <View>
              <TextInput
                ref={(input) => {
                  emailRef = input;
                }}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                onSubmitEditing={() => {
                  passwordRef.focus();
                }}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                returnKeyType={'next'}
                autoCorrect={false}
                placeholder={'email'}
                placeholderTextColor={'grey'}
                style={[
                  styles.textInput,
                  {borderBottomColor: emailError ? 'red' : 'black'},
                ]}
                value={email}
              />
              {emailError ? this.renderError(emailError) : null}
            </View>

            {/* textinput container for password */}
            <View style={styles.passwordContainer}>
              <TextInput
                ref={(input) => {
                  passwordRef = input;
                }}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                onSubmitEditing={this.handleLoginAction}
                returnKeyType={'done'}
                autoCapitalize={'none'}
                placeholder={'password'}
                placeholderTextColor={'grey'}
                autoCorrect={false}
                secureTextEntry={true}
                style={[
                  styles.textInput,
                  {borderBottomColor: passwordError ? 'red' : 'black'},
                ]}
                value={password}
              />
              {passwordError ? this.renderError(passwordError) : null}
            </View>

            <View style={styles.forgotLinkContainer}>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => {
                  navigation.navigate(Routes.FORGOTPASSWORD);
                }}
                style={styles.touchbleArea}>
                <Text style={{textDecorationLine: 'underline'}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signUpLinkContainer}>
              <View>
                <Text>New Here?</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => {
                  navigation.navigate(Routes.SIGNUP);
                }}>
                <Text style={styles.signUpLink}>Sign Up Instead</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.loginBtn}
              onPress={this.handleLoginAction}>
              <Text style={styles.loginText}>{Constants.LOGIN}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
