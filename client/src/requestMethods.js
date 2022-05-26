import axios from "axios";

export function userRequest() {
  var TOKEN = localStorage.getItem("user") ?
    JSON.parse(localStorage.getItem("user"))?.accessToken || 'NO_TOKEN'
    : 'NO_TOKEN';

  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      authorization: `Bearer ${TOKEN}`
    },
  });
}

export function publicRequest() {

  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
}