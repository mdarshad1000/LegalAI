import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );

  const addMessage = (newMessage: { text: string; sender: string }) => {
    setMessages([...messages, newMessage]);
  };

  const MessageList = () => {
    return (
      <div className="">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg p-4 ${
              message.sender === "user1" ? "ml-auto" : ""
            }`}
          >
            <p className="text-gray-800">{message.text}</p>
            <p className="text-gray-600 text-xs">{message.sender}</p>
          </div>
        ))}
      </div>
    );
  };

  const ChatForm = () => {
    const [newMessage, setNewMessage] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addMessage({ text: newMessage, sender: "user1" });
      setNewMessage("");

      axios
        .post(
          "http://localhost:5000/explain",
          { transcripts: messages },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setMessages(messages.concat(response.data.answer));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <form className="bg-gray-900 rounded-lg p-4" onSubmit={handleSubmit}>
        <input
          className="bg-black rounded-lg p-2 w-full"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button className="bg-blue-500 text-white rounded-lg p-2 w-full">
          Send Me your name
        </button>
      </form>
    );
  };

  return (
    <div className="flex h-full">
      <MessageList />
      <ChatForm />
    </div>
  );
};

export default Chatbot;
