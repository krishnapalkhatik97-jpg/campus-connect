import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import LeftSidebar from "../../components/layout/LeftSidebar";
import RightSidebar from "../../components/layout/RightSidebar";

import {
  getConversations,
  getMessages,
  sendMessage,
} from "../../services/chatService.ts";

export default function Chat() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openConversation = async (conversation: any) => {
    setSelectedConversation(conversation);

    try {
      const data = await getMessages(conversation.id);
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    if (!selectedConversation || !newMessage.trim()) return;

    try {
      const message = await sendMessage(
        selectedConversation.id,
        newMessage
      );

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-12 gap-6">

        <div className="col-span-3">
          <LeftSidebar />
        </div>

        <div className="col-span-6">

          <div className="bg-white rounded-2xl shadow-sm h-[80vh] flex overflow-hidden">

            {/* Conversation List */}

            <div className="w-1/3 border-r overflow-y-auto">

              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">
                  Messages
                </h2>
              </div>

              <div className="p-2">

                {conversations.length === 0 ? (
                  <p className="text-center text-gray-500 mt-4">
                    No conversations yet
                  </p>
                ) : (
                  conversations.map((conversation: any) => {
                    const otherUser = conversation.participants.find(
                      (user: any) =>
                        user.id !== localStorage.getItem("userId")
                    );

                    return (
                      <div
                        key={conversation.id}
                        onClick={() => openConversation(conversation)}
                        className={`p-3 rounded-xl cursor-pointer transition mb-2 ${
                          selectedConversation?.id === conversation.id
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <h3 className="font-semibold">
                          {otherUser?.name}
                        </h3>

                        <p className="text-sm text-gray-500 truncate">
                          {conversation.messages.length > 0
                            ? conversation.messages[0].content
                            : "Start chatting..."}
                        </p>
                      </div>
                    );
                  })
                )}

              </div>

            </div>

            {/* Chat Window */}

            <div className="flex-1 flex flex-col">

              <div className="border-b p-4 font-semibold">

                {selectedConversation
                  ? selectedConversation.participants.find(
                      (user: any) =>
                        user.id !== localStorage.getItem("userId")
                    )?.name
                  : "Select a conversation"}

              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">

                {!selectedConversation ? (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    Select a conversation
                  </div>
                ) : messages.length === 0 ? (
                  <p className="text-gray-400">
                    No messages yet
                  </p>
                ) : (
                  messages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`max-w-xs px-4 py-2 rounded-xl ${
                        message.senderId === localStorage.getItem("userId")
                          ? "bg-blue-600 text-white ml-auto"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {message.content}
                    </div>
                  ))
                )}

              </div>

              {selectedConversation && (
                <div className="border-t p-3 flex gap-3">

                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                    className="flex-1 border rounded-xl px-4 py-2 outline-none"
                  />

                  <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-5 rounded-xl hover:bg-blue-700"
                  >
                    Send
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

        <div className="col-span-3">
          <RightSidebar />
        </div>

      </div>
    </>
  );
}