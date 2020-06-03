import React, {useContext, useState, useEffect, useRef} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SafeAreaView from 'react-native-safe-area-view';
import Toast from 'react-native-simple-toast';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

// custom imports
import {store} from '../../redux/store';
import {validateEmail, checkEmpty} from '../../common/utility';
import {UpdateProfileAction} from '../../redux/actions';
import {Constants} from '../../common/constants';
import styles from './styles';

const Profile = (props) => {
  let firstnameRef = useRef('');
  let lastnameRef = useRef('');
  let emailRef = useRef('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const {state, dispatch} = useContext(store);

  console.log('profile state: ', state);

  useEffect(() => {
    if (showMessage && state.success !== '') Toast.show(state.success);

    setFirstname(state.user.firstname);
    setLastname(state.user.lastname);
    setEmail(state.user.email);
    return setShowMessage(false);
  }, [showMessage]);

  handleUpdateAction = async () => {
    if (!checkEmpty(firstname)) {
      setFirstnameError(Constants.BLANKNOTALLOWD);
      setLastnameError('');
      setEmailError('');
    } else if (!checkEmpty(lastname)) {
      setFirstnameError('');
      setLastnameError(Constants.BLANKNOTALLOWD);
      setEmailError('');
    } else if (!checkEmpty(email)) {
      setFirstnameError('');
      setLastnameError('');
      setEmailError(Constants.BLANKNOTALLOWD);
    } else if (!validateEmail(email)) {
      setFirstnameError('');
      setLastnameError('');
      setEmailError(Constants.INVALIDEMAIL);
    } else {
      console.log('handleUpdateAction else');
      setFirstnameError('');
      setLastnameError('');
      setEmailError('');
      await UpdateProfileAction(
        dispatch,
        firstname,
        lastname,
        email,
        state.user.password,
        state.user.id,
      );
      setShowMessage(true);
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
          <View style={{flex: 1}}>
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
              {firstnameError ? renderError(firstnameError) : null}
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
                onSubmitEditing={handleUpdateAction}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholder={'email'}
                placeholderTextColor={'grey'}
                style={[
                  styles.textInput,
                  {borderBottomColor: emailError ? 'red' : 'black'},
                ]}
                value={email}
              />
              {emailError ? renderError(emailError) : null}
            </View>
            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.loginBtn}
              onPress={handleUpdateAction}>
              <Text style={styles.loginText}>{Constants.UPDATE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Profile;
