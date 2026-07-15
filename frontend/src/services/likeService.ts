import axios from "axios";

const API = "http://localhost:5000/api/likes";

const getToken = () => {
  return localStorage.getItem("token");
};

export const toggleLike = async (postId: string) => {
  const response = await axios.post(
    `${API}/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};