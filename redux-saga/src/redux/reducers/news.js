import { FETCHNEWS, FETCHNEWSSUCCESS } from "../actions";

const initialState = {
  loading: false,
  error: '',
  news: []
}

const reducer = (state = initialState, action) => {
  console.log('action:', action);
  switch (action.type) {
    case FETCHNEWS:
      return {
        ...state,
        loading: true,
      }
    case FETCHNEWSSUCCESS:
      return {
        ...state,
        loading: false,
        news: action.payload
      }
    default:
      return state;
  }
}

export default reducer;