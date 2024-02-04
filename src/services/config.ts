import axios from "axios";

export const API_PRUEBA = "http://localhost:5173/src/data";

export const API = axios.create({
  baseURL: API_PRUEBA,
  headers: {
    "Content-Type": "application/json",
  },
});
