import axios from "axios";

const API_URL = "";  // mettre l'URL

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
