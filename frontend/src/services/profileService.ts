import axios from "axios";

const API = "http://localhost:5000/api/profile";

export const getProfile = async (userId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
