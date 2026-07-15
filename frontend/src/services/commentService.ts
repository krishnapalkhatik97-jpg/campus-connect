import axios from "axios";

const API = "http://localhost:5000/api/comments";

const getToken = () => {
  return localStorage.getItem("token");
};

export const createComment = async (
  postId: string,
  content: string
) => {
  const response = await axios.post(
    `${API}/${postId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const getComments = async (postId: string) => {
  const response = await axios.get(`${API}/${postId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};