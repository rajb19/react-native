// custom imports
import { Numbers } from "../common/constants";
import { DEVBASEURL } from "./config";

// API routes
const fetchPost = '/search_by_date';

export const API = {
  fetchPost: (tags = 'story', page = 1) => {
    return `${DEVBASEURL}${fetchPost}?tags=${tags}&page=${page}&hitsPerPage=${Numbers.PERPAGE}`;
  }
}