// action types
export const FETCHNEWS = 'FetchNews';
export const FETCHNEWSSUCCESS = 'FetchNewsSucsess'; 1

// actions
export const getNews = () => {
  return {
    type: FETCHNEWS
  }
}

export const fetchNewsSucsess = (data) => {
  return {
    type: FETCHNEWSSUCCESS,
    payload: data
  }
}