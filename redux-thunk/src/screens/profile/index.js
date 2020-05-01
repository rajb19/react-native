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
import { validateEmail, checkEmpty } from '../../common/utility';
import { UpdateProfileAction } from '../../redux/actions';
import { Constants } from '../../common/constants';
import styles from "./styles";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstnameError: '',
      lastnameError: '',
      emailError: '',
      firstname: '',
      lastname: '',
      email: '',
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
    });
  }

  handleUpdateAction = async () => {
    const { firstname, lastname, email } = this.state;
    const { user } = this.props;
    if (!checkEmpty(firstname)) {
      this.setState({ firstnameError: Constants.BLANKNOTALLOWD, lastnameError: '', emailError: '' });
    } else if (!checkEmpty(lastname)) {
      this.setState({ firstnameError: '', lastnameError: Constants.BLANKNOTALLOWD, emailError: '' });
    } else if (!checkEmpty(email)) {
      this.setState({ firstnameError: '', lastnameError: '', emailError: Constants.BLANKNOTALLOWD });
    } else if (!validateEmail(email)) {
      this.setState({ emailError: Constants.INVALIDEMAIL });
    } else {
      this.setState({ firstnameError: '', lastnameError: '', emailError: '' });
      await this.props.updateProfileAction(firstname, lastname, email, user.password, user.id);
      if (this.props.success !== '') Toast.show(this.props.success);
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
    const { email, firstname, lastname,
      emailError, firstnameError, lastnameError } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <View style={{ flex: 1 }}>
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
                  onSubmitEditing={this.handleUpdateAction}
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
                style={styles.loginBtn}
                onPress={this.handleUpdateAction}>
                <Text style={styles.loginText}>{Constants.UPDATE}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

    );
  }
}

const mapStateToProps = (state) => ({
  success: state.auth.success,
  user: state.auth.user,
  users: state.auth.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfileAction: bindActionCreators(UpdateProfileAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
