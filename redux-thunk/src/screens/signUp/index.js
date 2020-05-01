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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import Toast from 'react-native-simple-toast';
import { View, Text, TextInput } from 'react-native';

// custom imports
import { Constants } from '../../common/constants';
import { validateEmail, checkEmpty } from '../../common/utility';
import { RegisterAction } from '../../redux/actions';
import * as Routes from '../../navigator/routes';
import styles from "./styles";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordError: '',
      firstnameError: '',
      lastnameError: '',
      emailError: '',
      firstname: '',
      lastname: '',
      password: '',
      email: '',
    };
  }

  handleRegisterAction = async () => {
    const { firstname, lastname, email, password } = this.state;
    if (!checkEmpty(firstname)) {
      this.setState({ firstnameError: Constants.BLANKNOTALLOWD, lastnameError: '', emailError: '', passwordError: '' });
    } else if (!checkEmpty(lastname)) {
      this.setState({ firstnameError: '', lastnameError: Constants.BLANKNOTALLOWD, emailError: '', passwordError: '' });
    } else if (!checkEmpty(email)) {
      this.setState({ firstnameError: '', lastnameError: '', emailError: Constants.BLANKNOTALLOWD, passwordError: '' });
    } else if (!validateEmail(email)) {
      this.setState({ emailError: Constants.INVALIDEMAIL, passwordError: '' });
    } else if (!checkEmpty(password)) {
      this.setState({ firstnameError: '', lastnameError: '', emailError: '', passwordError: Constants.BLANKNOTALLOWD });
    } else {
      this.setState({ firstnameError: '', lastnameError: '', emailError: '', passwordError: '' });
      await this.props.registerAction(firstname, lastname, email, password);
      if (this.props.error !== '') {
        Toast.show(this.props.error);
      } else {
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
    const { email, password, firstname, lastname,
      emailError, passwordError, firstnameError, lastnameError } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>Create Your Account</Text>
            </View>
            <View style={{ flex: 8 }}>
              {/* textinput container for first name */}
              <View style={styles.inputView}>
                <TextInput
                  ref={input => {
                    this.firstname = input;
                  }}
                  onChangeText={text => {
                    this.setState({ firstname: text });
                  }}
                  onSubmitEditing={() => {
                    this.lastname.focus();
                  }}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  autoCorrect={false}
                  placeholder={'firstname'}
                  placeholderTextColor={'grey'}
                  style={[styles.textInput, { borderBottomColor: firstnameError ? 'red' : 'black' }]}
                  value={firstname}
                />
                {firstnameError ? this.renderError(firstnameError) : null}
              </View>

              {/* textinput container for lastname */}
              <View style={styles.inputView}>
                <TextInput
                  ref={input => {
                    this.lastname = input;
                  }}
                  onChangeText={text => {
                    this.setState({ lastname: text });
                  }}
                  onSubmitEditing={() => {
                    this.email.focus();
                  }}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  autoCorrect={false}
                  placeholder={'lastname'}
                  placeholderTextColor={'grey'}
                  style={[styles.textInput, { borderBottomColor: lastnameError ? 'red' : 'black' }]}
                  value={lastname}
                />
                {lastnameError ? this.renderError(lastnameError) : null}
              </View>

              {/* textinput container for email */}
              <View style={styles.inputView}>
                <TextInput
                  ref={input => {
                    this.email = input;
                  }}
                  onChangeText={text => {
                    this.setState({ email: text });
                  }}
                  onSubmitEditing={() => {
                    this.password.focus();
                  }}

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

              {/* textinput container for password */}
              <View style={styles.inputView}>
                <TextInput
                  ref={input => {
                    this.password = input;
                  }}
                  onChangeText={text => {
                    this.setState({ password: text });
                  }}
                  onSubmitEditing={this.handleRegisterAction}
                  returnKeyType={'next'}
                  autoCapitalize={'none'}
                  placeholder={'Password'}
                  placeholderTextColor={'grey'}
                  autoCorrect={false}
                  secureTextEntry={true}
                  style={[styles.textInput, { borderBottomColor: passwordError ? 'red' : 'black' }]}
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
                  onPress={() => { this.props.navigation.navigate(Routes.SIGNIN) }} >
                  <Text style={styles.signUpLink}>Sign In</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  success: state.auth.success,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    registerAction: bindActionCreators(RegisterAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
