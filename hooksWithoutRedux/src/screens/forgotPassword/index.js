import React, {useContext, useState, useEffect, useRef} from 'react';
import Toast from 'react-native-simple-toast';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {find} from 'lodash';

// custom imports
import {store} from '../../redux/store';
import {ForgotPasswordAction, ResetPasswordAction} from '../../redux/actions';
import {validateEmail, checkEmpty} from '../../common/utility';
import {Constants} from '../../common/constants';
import * as Routes from '../../navigator/routes';
import styles from './styles';

const ForgotPassword = (props) => {
  const {state, dispatch} = useContext(store);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showMessage && state.error !== '') Toast.show(state.error);
    if (showMessage && state.success !== '') {
      Toast.show(state.success);
      setIsShowModal(true);
    }
    return () => {
      setShowMessage(false);
    };
  }, [showMessage]);

  handleSendAction = () => {
    if (!checkEmpty(email)) {
      setEmailError(Constants.BLANKNOTALLOWD);
    } else if (!validateEmail(email)) {
      setEmailError(Constants.INVALIDEMAIL);
    } else {
      setEmailError('');
      ForgotPasswordAction(dispatch, email, state.users);
      setShowMessage(true);
    }
  };

  handleResetPasswordAction = async () => {
    const response = find(state.users, {email: email});
    if (!checkEmpty(password)) {
      setPasswordError(Constants.BLANKNOTALLOWD);
      setConfirmPasswordError('');
    } else if (confirmPassword !== password) {
      setPasswordError('');
      setConfirmPasswordError(Constants.PASSWORDMISMATCH);
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
      await ResetPasswordAction(dispatch, password, response.id);
      if (state.error !== '') {
        Toast.show(state.success);
      } else if (state.success !== '') {
        setIsShowModal(false);
        Toast.show(state.success);
        props.navigation.navigate(Routes.SIGNIN);
      }
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
        style={styles.mainContainer}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Forgot Your Password</Text>
          </View>
          <View style={{flex: 10}}>
            {/* textinput container for email */}
            <View style={{}}>
              <TextInput
                ref={(input) => {
                  this.email = input;
                }}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                onSubmitEditing={this.handleSendAction}
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

            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.sendButton}
              onPress={this.handleSendAction}>
              <Text style={styles.sendText}>{Constants.SEND}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Modal isVisible={isShowModal}>
        <View style={{backgroundColor: 'white', height: 300, borderRadius: 6}}>
          <View style={{alignItems: 'center', paddingVertical: 20}}>
            <Text style={{fontSize: 18}}>Reset Password</Text>
          </View>
          {/* textinput container for password */}
          <View style={styles.inputView}>
            <TextInput
              ref={(input) => {
                this.password = input;
              }}
              onChangeText={(text) => {
                setPassword(text);
              }}
              onSubmitEditing={() => {
                this.confirmPassword.focus();
              }}
              returnKeyType={'next'}
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

          {/* textinput container for confirm password */}
          <View style={styles.inputView}>
            <TextInput
              ref={(input) => {
                this.confirmPassword = input;
              }}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              onSubmitEditing={this.handleResetPasswordAction}
              returnKeyType={'next'}
              autoCapitalize={'none'}
              placeholder={'confirm password'}
              placeholderTextColor={'grey'}
              autoCorrect={false}
              secureTextEntry={true}
              style={[
                styles.textInput,
                {borderBottomColor: confirmPasswordError ? 'red' : 'black'},
              ]}
              value={confirmPassword}
            />
            {confirmPasswordError
              ? this.renderError(confirmPasswordError)
              : null}
          </View>

          <TouchableOpacity
            activeOpacity={0.3}
            style={styles.resetButton}
            onPress={this.handleResetPasswordAction}>
            <Text style={styles.resetText}>{Constants.RESET}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ForgotPassword;
