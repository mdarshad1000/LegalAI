import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Chatbot from "../chatbot";

export default function Pdf() {
  const router = useRouter();
  const { slug } = router.query;
  const pdfURL =
    `https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2` +
    slug +
    "? alt = media";

  // useEffect(() => {
  //     axios.post('http://localhost:5000/api/pdf', {
  //         pdfURL: pdfURL
  //         })
  //         .then(function (response) {
  //             console.log(response);
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //         });
  // }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full">
        <embed
          src={
            `https://firebasestorage.googleapis.com/v0/b/legal-ai-8ebe8.appspot.com/o/pdfs%2` +
            slug +
            "?alt=media"
          }
          type="application/pdf"
          width="100%"
          height="100%"
        ></embed>
      </div>

      <div className="flex w-1/2 p-2 flex-col">
        <div className="flex border-b p-2 w-full">
          <h1 className="font-semibold text-3xl mx-auto">
            Navigating the law. One question at a time.
          </h1>
        </div>

        <p className="p-8">
          <b>Unlock the power of your legal documents with our user-friendly web app.
            Get quick and accurate answers to understand your legal rights and obligations.</b>
        </p>
        <Chatbot />

        {/* <div className="fixed bottom-0 right-0 m-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3
                                0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
            </div>
          </button>
        </div> */}
      </div>
    </div>
  );
}
