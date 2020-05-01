/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-simple-toast';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { find } from "lodash";

// custom imports
import { ForgotPasswordAction, ResetPasswordAction } from '../../redux/actions';
import { validateEmail, checkEmpty } from '../../common/utility';
import { Constants } from '../../common/constants';
import * as Routes from "../../navigator/routes";
import styles from "./styles";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPasswordError: '',
      passwordError: '',
      emailError: '',
      email: '',
      password: '',
      confirmPassword: '',
      isShowModal: false
    };
  }

  handleSendAction = async () => {
    const { email } = this.state;
    if (!checkEmpty(email)) {
      this.setState({ emailError: Constants.BLANKNOTALLOWD });
    } else if (!validateEmail(email)) {
      this.setState({ emailError: Constants.INVALIDEMAIL });
    } else {
      this.setState({ emailError: '' });
      await this.props.forgotPasswordAction(email, this.props.users);
      if (this.props.error !== '') {
        Toast.show(this.props.error);
      } else if (this.props.success !== '') {
        Toast.show(this.props.success);
        setTimeout(() => {
          this.setState({ isShowModal: true });
        }, 1000);
      }
    }
  };

  handleResetPasswordAction = async () => {
    const { email, password, confirmPassword } = this.state;
    const { users } = this.props;
    const response = find(users, { 'email': email });
    if (!checkEmpty(password)) {
      this.setState({ passwordError: Constants.BLANKNOTALLOWD, confirmPasswordError: '' });
    } else if (confirmPassword !== password) {
      this.setState({ passwordError: '', confirmPasswordError: Constants.PASSWORDMISMATCH });
    } else {
      this.setState({ passwordError: '', confirmPasswordError: '' });
      await this.props.resetPasswordAction(password, response.id);
      if (this.props.error !== '') {
        Toast.show(this.props.success);
      } else if (this.props.success !== '') {
        this.setState({ isShowModal: false });
        Toast.show(this.props.success);
        this.props.navigation.navigate(Routes.SIGNIN)
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

  render() {
    const { isShowModal, email, password, confirmPassword, emailError, confirmPasswordError, passwordError } = this.state
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          style={styles.mainContainer}
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={styles.mainContainer} >
          <View style={styles.inputContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Forgot Your Password</Text>
            </View>
            <View style={{ flex: 10 }}>
              {/* textinput container for email */}
              <View style={{}} >
                <TextInput
                  ref={input => {
                    this.email = input;
                  }}
                  onChangeText={text => {
                    this.setState({ email: text });
                  }}
                  onSubmitEditing={this.handleSendAction}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  autoCorrect={false}
                  placeholder={'email'}
                  placeholderTextColor={'grey'}
                  style={[styles.textInput, { borderBottomColor: emailError ? 'red' : 'black' }]}
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
          <View style={{ backgroundColor: 'white', height: 300, borderRadius: 6 }}>
            <View style={{ alignItems: 'center', paddingVertical: 20 }} >
              <Text style={{ fontSize: 18 }} >Reset Password</Text>
            </View>
            {/* textinput container for password */}
            <View style={styles.inputView}>
              <TextInput
                ref={input => {
                  this.password = input;
                }}
                onChangeText={text => {
                  this.setState({ password: text });
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
                style={[styles.textInput, { borderBottomColor: passwordError ? 'red' : 'black' }]}
                value={password}
              />
              {passwordError ? this.renderError(passwordError) : null}
            </View>

            {/* textinput container for confirm password */}
            <View style={styles.inputView}>
              <TextInput
                ref={input => {
                  this.confirmPassword = input;
                }}
                onChangeText={text => {
                  this.setState({ confirmPassword: text });
                }}
                onSubmitEditing={this.handleResetPasswordAction}
                returnKeyType={'next'}
                autoCapitalize={'none'}
                placeholder={'confirm password'}
                placeholderTextColor={'grey'}
                autoCorrect={false}
                secureTextEntry={true}
                style={[styles.textInput, { borderBottomColor: confirmPasswordError ? 'red' : 'black' }]}
                value={confirmPassword}
              />
              {confirmPasswordError ? this.renderError(confirmPasswordError) : null}
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
  }
}

const mapStateToProps = (state) => ({
  success: state.auth.success,
  error: state.auth.error,
  users: state.auth.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPasswordAction: bindActionCreators(ForgotPasswordAction, dispatch),
    resetPasswordAction: bindActionCreators(ResetPasswordAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
