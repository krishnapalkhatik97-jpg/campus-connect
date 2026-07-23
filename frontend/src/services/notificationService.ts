import axios from "axios";

const API = "http://localhost:5000/api/notifications";

const getToken = () => localStorage.getItem("token");

export const getNotifications = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

export const markNotificationRead = async (id: string) => {
  const res = await axios.patch(
    `${API}/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.data;
};