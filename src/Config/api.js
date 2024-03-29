import axios from "axios";

export const API = axios.create({
  baseURL: "https://finaltaskwaysbook.herokuapp.com/api/v1/",
  // baseURL: "localhost:5000",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
