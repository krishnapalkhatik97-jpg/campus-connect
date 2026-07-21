import axios from "axios";

const API = "http://localhost:5000/api/follow";

export const toggleFollow = async (userId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};