import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  success: '',
  error: '',
  posts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
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
    case ActionTypes.GETPOSTS:
      return {
        ...state, success: '', error: '',
        posts: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
