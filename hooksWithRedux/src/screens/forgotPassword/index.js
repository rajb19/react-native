import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {find} from 'lodash';

// custom imports
import {ForgotPasswordAction, ResetPasswordAction} from '../../redux/actions';
import {validateEmail, checkEmpty} from '../../common/utility';
import {Constants} from '../../common/constants';
import * as Routes from '../../navigator/routes';
import styles from './styles';

const ForgotPassword = (props) => {
  const dispatch = useDispatch();

  const {users, error, success} = useSelector((state) => ({
    users: state.auth.users,
    success: state.auth.success,
    error: state.auth.error,
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast && error !== '') Toast.show(error);

    if (showToast && success !== '') {
      Toast.show(success);
      setTimeout(() => {
        setIsShowModal(true);
      }, 1000);
    }
  }, [showToast]);

  handleSendAction = async () => {
    if (!checkEmpty(email)) {
      setEmailError(Constants.BLANKNOTALLOWD);
    } else if (!validateEmail(email)) {
      setEmailError(Constants.INVALIDEMAIL);
    } else {
      setEmailError('');
      await dispatch(ForgotPasswordAction(email, users));
      setShowToast(true);
    }
  };

  handleResetPasswordAction = async () => {
    const response = find(users, {email: email});
    if (!checkEmpty(password)) {
      setPasswordError(Constants.BLANKNOTALLOWD);
      setConfirmPasswordError('');
    } else if (confirmPassword !== password) {
      setPasswordError('');
      setConfirmPasswordError(Constants.PASSWORDMISMATCH);
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
      await dispatch(ResetPasswordAction(password, response.id));
      setShowToast(true);
      setIsShowModal(false);
      // props.navigation.navigate(Routes.SIGNIN);
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
