import axios from "axios";

const CONVERSATION_API = "http://localhost:5000/api/conversations";
const MESSAGE_API = "http://localhost:5000/api/messages";

const getToken = () => {
  return localStorage.getItem("token");
};

// Get all conversations
export const getConversations = async () => {
  const response = await axios.get(CONVERSATION_API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Create conversation
export const createConversation = async (receiverId: string) => {
  const response = await axios.post(
    CONVERSATION_API,
    {
      receiverId,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// Get messages
export const getMessages = async (conversationId: string) => {
  const response = await axios.get(
    `${MESSAGE_API}/${conversationId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

// Send message
export const sendMessage = async (
  conversationId: string,
  content: string
) => {
  const response = await axios.post(
    MESSAGE_API,
    {
      conversationId,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};