import axios from "axios";

const API = "http://localhost:5000/api/posts";

const getToken = () => {
  return localStorage.getItem("token");
};

export const createPost = async (content: string) => {
  const response = await axios.post(
    API,
    { content },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const getPosts = async () => {
  const response = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};