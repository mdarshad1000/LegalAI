import React, { useState } from "react";
import axios from "axios";
import { type } from "os";

interface Chat {
  message: string;
  author: string;
}

const Chatbot: React.FC = () => {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(typeof(input))
    console.log('lol', input);
    let a = {message: input}

    axios.post("http://localhost:5000/chat",
    
    {
      message: input,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      console.log(response.data.response_text);
      const response_text = response.data.response_text;
      setChats([...chats, { message: response_text, author: "bot" }]);
      setInput("");
    })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="flex flex-col">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`py-2 px-4 ${
                  chat.author === "user" ? "bg-gray-200" : "bg-blue-200"
                }`}
              >
                <p className="text-sm text-gray-800">{chat.message}</p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-200">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="px-4 py-2 rounded-lg w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;