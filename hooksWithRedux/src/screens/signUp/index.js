/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import Toast from 'react-native-simple-toast';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

// custom imports
import {Constants} from '../../common/constants';
import {validateEmail, checkEmpty} from '../../common/utility';
import {RegisterAction} from '../../redux/actions';
import * as Routes from '../../navigator/routes';
import styles from './styles';

function SignUp() {
  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  let firstnameRef = useRef(null);
  let lastnameRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (showMessage && auth.error !== '') Toast.show(auth.error);
    if (showMessage && auth.success !== '') Toast.show(auth.success);

    return () => {
      setShowMessage(false);
    };
  }, [showMessage]);

  handleRegisterAction = async () => {
    if (!checkEmpty(firstname)) {
      setFirstnameError(Constants.BLANKNOTALLOWD);
      setLastnameError('');
      setPasswordError('');
      setEmailError('');
    } else if (!checkEmpty(lastname)) {
      setFirstnameError('');
      setLastnameError(Constants.BLANKNOTALLOWD);
      setPasswordError('');
      setEmailError('');
    } else if (!checkEmpty(email)) {
      setFirstnameError('');
      setLastnameError('');
      setPasswordError('');
      setEmailError(Constants.BLANKNOTALLOWD);
    } else if (!validateEmail(email)) {
      setFirstnameError('');
      setLastnameError('');
      setPasswordError('');
      setEmailError(Constants.INVALIDEMAIL);
    } else if (!checkEmpty(password)) {
      setFirstnameError('');
      setLastnameError('');
      setPasswordError(Constants.BLANKNOTALLOWD);
      setEmailError('');
    } else {
      setFirstnameError('');
      setLastnameError('');
      setPasswordError('');
      setEmailError('');
      await dispatch(RegisterAction(firstname, lastname, email, password));
      setShowMessage(true);
      navigation.navigate(Routes.SIGNIN);
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
            <Text style={styles.headingText}>Create Your Account</Text>
          </View>
          <View style={{flex: 8}}>
            {/* textinput container for first name */}
            <View style={styles.inputView}>
              <TextInput
                ref={(input) => {
                  firstnameRef = input;
                }}
                onChangeText={(text) => {
                  setFirstname(text);
                }}
                onSubmitEditing={() => {
                  lastnameRef.focus();
                }}
                autoCapitalize={'none'}
                returnKeyType={'next'}
                autoCorrect={false}
                placeholder={'firstname'}
                placeholderTextColor={'grey'}
                style={[
                  styles.textInput,
                  {borderBottomColor: firstnameError ? 'red' : 'black'},
                ]}
                value={firstname}
              />
              {firstnameError ? this.renderError(firstnameError) : null}
            </View>

            {/* textinput container for lastname */}
            <View style={styles.inputView}>
              <TextInput
                ref={(input) => {
                  lastnameRef = input;
                }}
                onChangeText={(text) => {
                  setLastname(text);
                }}
                onSubmitEditing={() => {
                  emailRef.focus();
                }}
                autoCapitalize={'none'}
                returnKeyType={'next'}
                autoCorrect={false}
                placeholder={'lastname'}
                placeholderTextColor={'grey'}
                style={[
                  styles.textInput,
                  {borderBottomColor: lastnameError ? 'red' : 'black'},
                ]}
                value={lastname}
              />
              {lastnameError ? this.renderError(lastnameError) : null}
            </View>

            {/* textinput container for email */}
            <View style={styles.inputView}>
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
            <View style={styles.inputView}>
              <TextInput
                ref={(input) => {
                  passwordRef = input;
                }}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                onSubmitEditing={this.handleRegisterAction}
                returnKeyType={'done'}
                autoCapitalize={'none'}
                placeholder={'Password'}
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

            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.loginBtn}
              onPress={this.handleRegisterAction}>
              <Text style={styles.loginText}>{Constants.REGISTER}</Text>
            </TouchableOpacity>

            <View style={styles.signUpLinkContainer}>
              <View>
                <Text>Have an account?</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={() => {
                  navigation.navigate(Routes.SIGNIN);
                }}>
                <Text style={styles.signUpLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SignUp;
