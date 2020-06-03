import * as ActionTypes from './actionTypes';
import {Constants} from '../../common/constants';
import {find, isEmpty} from 'lodash';

/**
 *  actions
 */
export const isLoading = (data) => {
  return {
    type: ActionTypes.ISLOADING,
    payload: data,
  };
};

export const successMessage = (data) => {
  return {
    type: ActionTypes.SUCCESS,
    payload: data,
  };
};

export const errorMessage = (data) => {
  return {
    type: ActionTypes.ERROR,
    payload: data,
  };
};

export const login = (data) => {
  return {
    type: ActionTypes.LOGIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: ActionTypes.LOGOUT,
    payload: {},
  };
};

export const register = (data) => {
  return {
    type: ActionTypes.REGISTER,
    payload: data,
  };
};

export const forgotPassword = (data) => {
  return {
    type: ActionTypes.FORGOTPASSWORD,
    payload: data,
  };
};

export const updateProfile = (data) => {
  return {
    type: ActionTypes.PROFILEUPDATE,
    payload: data,
  };
};

export const updateLoggedInUser = (data) => {
  return {
    type: ActionTypes.LOGGEDINUSER,
    payload: data,
  };
};

export const resetPassword = (data) => {
  return {
    type: ActionTypes.RESETPASSWORD,
    payload: data,
  };
};

/**
 *  action creators
 */
export const IsLoadingAction = (data) => async (dispatch) => {
  dispatch(isLoading(data));
};

export const LoginAction = (dispatch, email, password, users) => {
  dispatch(isLoading(true));
  const response = find(users, {email: email, password: password});
  if (!isEmpty(response)) {
    dispatch(login(response));
    dispatch(successMessage(Constants.LOGINSUCCESS));
    dispatch(isLoading(false));
  } else {
    dispatch(isLoading(false));
    dispatch(errorMessage(Constants.INVALIDUSERPASSWORD));
  }
};

export const LogoutAction = (dispatch) => {
  dispatch(isLoading(true));
  dispatch(logout());
  dispatch(successMessage(Constants.LOGOUTSUCCESS));
  dispatch(isLoading(false));
};

export const RegisterAction = (
  dispatch,
  firstname,
  lastname,
  email,
  password,
) => {
  dispatch(isLoading(true));
  const data = {
    id: Math.floor(Math.random() * 1001),
    firstname,
    lastname,
    email,
    password,
  };
  dispatch(register(data));
  dispatch(successMessage(Constants.REGISTRATIONSUCESS));
  dispatch(isLoading(false));
};

export const ForgotPasswordAction = (dispatch, email, users) => {
  dispatch(isLoading(true));
  const response = find(users, {email: email});
  if (!isEmpty(response)) {
    dispatch(successMessage(Constants.SENDLINKSUCCESS));
    dispatch(isLoading(false));
  } else {
    dispatch(isLoading(false));
    dispatch(errorMessage(Constants.EMIALNOTEXISTS));
  }
};

export const ResetPasswordAction = (dispatch, password, userId) => {
  dispatch(isLoading(true));
  const data = {id: userId, password};
  dispatch(resetPassword(data));
  dispatch(successMessage(Constants.PASSWORDCHANGESUCESS));
  dispatch(isLoading(false));
};

export const UpdateProfileAction = (
  dispatch,
  firstname,
  lastname,
  email,
  password,
  userId,
) => {
  console.log('UpdateProfileAction: ');
  dispatch(isLoading(true));
  const data = {id: userId, firstname, lastname, email, password};
  dispatch(updateProfile(data));
  dispatch(updateLoggedInUser(data));
  dispatch(successMessage(Constants.PROFILEUPDATESUCESS));
  dispatch(isLoading(false));
};
