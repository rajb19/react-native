import * as ActionTypes from './actionTypes';
import Axios from 'axios';
import { API } from '../../services/api';
import { ErrroMessages } from '../../common/constants';

/**
 *  actions
 */
export const loading = (data) => {
  return {
    type: ActionTypes.LOADING,
    payload: data,
  };
};

// success message
export const success = (data) => {
  return {
    type: ActionTypes.SUCCESS,
    payload: data,
  };
};

// error message
export const error = (data) => {
  return {
    type: ActionTypes.ERROR,
    payload: data,
  };
};

export const getPosts = (data) => {
  return {
    type: ActionTypes.GETPOSTS,
    payload: data
  }
}

/**
 *  action creators
 */
export const LoadingAction = (data) =>
  async (dispatch) => {
    await dispatch(loading(data));
  };

export const FetchPosts = (tags, page) =>
  async (dispatch) => {
    await Axios.get(API.fetchPost(tags, page))
      .then((response) => {
        dispatch(getPosts(response.data))
      })
      .catch((e) => {
        console.log("Error: ", e);
        dispatch(error(ErrroMessages.SOMTHING_WENT_WRONG))
      })
  }