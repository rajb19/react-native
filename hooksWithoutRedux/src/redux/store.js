import React, {createContext, useReducer} from 'react';
import createPersistedState from 'use-persisted-state';
import * as ActionTypes from './actions/actionTypes';

const initialState = {
  loading: false,
  success: '',
  error: '',
  isLoggedIn: false,
  user: {},
  users: [],
};

const store = createContext(initialState);
const {Provider} = store;

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ActionTypes.REGISTER:
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case ActionTypes.LOGIN:
        return {
          ...state,
          user: action.payload,
          isLoggedIn: true,
          success: '',
          error: '',
        };
      case ActionTypes.LOGOUT:
        return {
          ...state,
          user: {},
          isLoggedIn: false,
          success: '',
          error: '',
        };
      case ActionTypes.SUCCESS:
        return {
          ...state,
          success: action.payload,
          error: '',
        };
      case ActionTypes.ERROR:
        return {
          ...state,
          error: action.payload,
          success: '',
        };
      case ActionTypes.ISLOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case ActionTypes.PROFILEUPDATE:
        return {
          ...state,
          users: state.users.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  firstname: action.payload.firstname,
                  lastname: action.payload.lastname,
                  email: action.payload.email,
                }
              : item,
          ),
        };
      case ActionTypes.RESETPASSWORD:
        return {
          ...state,
          users: state.users.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  password: action.payload.password,
                }
              : item,
          ),
        };
      case ActionTypes.LOGGEDINUSER:
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, AppProvider};
