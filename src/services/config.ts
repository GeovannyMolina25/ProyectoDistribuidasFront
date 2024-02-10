import axios from "axios";

export const API_PRUEBA = "https://distribuidas.onrender.com";

export const API = axios.create({
  baseURL: API_PRUEBA,
  headers: {
    "Content-Type": "application/json",
  },
});
