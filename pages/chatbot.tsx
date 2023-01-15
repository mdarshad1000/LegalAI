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
    console.log("lol", input);
    setChats([...chats, { message: input, author: "user" }]);

    axios
      .post(
        "http://localhost:5000/chat",

        {
          message: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.Answer);
        const Answer = res.data.Answer;
        setChats([
          ...chats,
          { message: input, author: "user" },
          { message: Answer, author: "bot" },
        ]);
        setInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg mx-10">
        <div className="my-2">
          <div className="flex flex-col">
            {chats.map((chat, index) => (
              <div
                key={index}
                className={`py-1.5 px-2 rounded-lg mx-3 ${
                  chat.author === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-1 leading-8 text-m rounded-lg ${
                    chat.author === "user" ? "bg-gray-700" : "bg-gray-800"
                  }`}
                >
                  {chat.message}
                </span>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 mx-4 my-4 rounded-lg"
        >
          <input
            type="text"
            value={input}
            placeholder="Ask anything about your document..."
            onChange={(event) => setInput(event.target.value)}
            className="px-4 py-3 rounded-lg w-[93%] bg-inherit border-none outline-none text-white"
          />
          <button type="submit" className="px-2 pt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="bg-gray-700"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
