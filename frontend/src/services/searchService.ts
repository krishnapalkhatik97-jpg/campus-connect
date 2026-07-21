import axios from "axios";

const API = "http://localhost:5000/api/search";

const getToken = () => localStorage.getItem("token");

export const searchUsers = async (query: string) => {
  const res = await axios.get(`${API}?q=${query}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};