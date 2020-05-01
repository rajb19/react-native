import { DEVURL, apiKey } from "./config";

// API URL
const TOPHEADLINE = '/top-headlines';

// API 
const API = {
  fetchNews() {
    return fetch(`${DEVURL}${TOPHEADLINE}?country=us&apiKey=${apiKey}`)
      .then(response => response.json());
  }
}

export default API;