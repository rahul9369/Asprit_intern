import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { FaAngleDown } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const Technical = () => {
  const scrollContainerRef = useRef(null);
  const [time, setTime] = useState(0); // Start time from 0 seconds
  const [isFullScreen, setIsFullScreen] = useState(false);

  const codeString = `def find_most_expensive_book(q, start, range_count):
    n = len(q)
    max_price = -1
    max_price_title = ""

    for i in range(range_count):
        idx = (start + i) % n
        book_title, book_price = q[idx]
        if book_price > max_price:
           `;

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex flex-1">
        {/* Left side code editor container */}
        <div className="w-3/5 ml-8 mr-4 my-8 rounded-3xl bg-black relative shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-white flex p-5 flex-row font-semibold">
              Language: Python(3.8.1)
              <span className="mx-4 p-2">
                <FaAngleDown />
              </span>
            </h2>
            <span className="bg-black text-[#0072DC] border mx-5 border-gray-600 p-2 rounded-full">
              Timer: {formatTime()}
            </span>
          </div>
          <hr />
          {/* Code block with line numbering and custom colors */}
          <SyntaxHighlighter
            language="python"
            style={solarizedlight}
            showLineNumbers={true}
            customStyle={{
              backgroundColor: "#0F0F0F",
              color: "white",
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
            lineNumberStyle={{ color: "#0072DC" }} // Blue color for line numbers
          >
            {codeString}
          </SyntaxHighlighter>

          {/* Webcam section and circular overlay */}
          <div
            className={`absolute ${
              isFullScreen
                ? "top-0 left-0  w-full h-full"
                : "bottom-[-80px]  flex items-center"
            }`}>
            {/* Webcam feed */}
            <div
              className={`relative ${
                isFullScreen ? "w-full h-full" : "w-32  h-48"
              } rounded-3xl overflow-hidden border-4 border-white shadow-lg`}>
              <Webcam audio={false} className="w-full h-full object-cover" />

              {/* Expand icon in the upper-right corner */}
              <img
                src="/expandIcon.png"
                alt="Expand Icon"
                className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
                onClick={toggleFullScreen}
                style={{
                  position: "absolute",
                  top: "5px", // Adjusts vertical position
                  right: "5px", // Adjusts horizontal position
                  zIndex: 10, // Ensures it stays on top of other elements
                }}
              />
            </div>

            {/* Circular overlay image next to the webcam */}
            {!isFullScreen && (
              <img
                src="/circular_overlay.png"
                alt="Circular Overlay"
                className="w-28 h-28 ml-4 object-cover rounded-full shadow-lg"
                style={{
                  position: "relative",
                  top: "-5px", // Adjusts vertical alignment
                  left: "250px",
                }}
              />
            )}
          </div>
        </div>

        {/* Right side question and example container */}
        <div className="w-2/5 flex flex-col justify-between my-8 mr-8 space-y-5">
          {/* Question container */}
          <div className="flex flex-col bg-[#0F0F36] rounded-3xl p-5 text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-4">1 Question</h3>
            <p className="mb-28 font-normal ">
              You are developing a system for a bookstore to manage its
              inventory. The bookstore has a unique way of organizing books:
              they are arranged in a circular queue, where the front of the
              queue connects back to the rear. Each book in the queue has a
              title and a price. The store owner wants to implement a feature
              that finds the most expensive book within a given range of the
              queue, considering its circular nature. Write a function that
              takes the circular queue of books, a start position, and the
              number of books to consider, and returns the title of the most
              expensive book within that range.
            </p>
          </div>

          {/* Example container */}
          <div className="flex flex-col bg-[#EDF1FF] rounded-3xl p-5 text-gray-800 shadow-lg">
            <h3 className="text-xl font-semibold mt-8 mb-16">Example:</h3>
            <p>
              Input Queue: [("The Hobbit", 15), ("1984", 10), ("To Kill a
              Mockingbird", 12), ("Pride and Prejudice", 9), ("The Great
              Gatsby", 11)], Start: 2, Range: 4
            </p>
            <p className="mt-4 font-semibold">Output: The Hobbit</p>
            <p className="text-gray-600 mt-2">
              Explanation: Starting from "To Kill a Mockingbird", considering 4
              books, we wrap around to "The Hobbit", which is the most expensive
              at $15.
            </p>
          </div>
        </div>
      </div>

      {/* Buttons container placed below the right section */}
      <div className="flex justify-end space-x-4 mr-8 mb-4 ">
        <button className="py-2 px-6 text-blue-500 rounded-3xl hover:bg-gray-100">
          <span className="bg-red-500 mx-2 rounded-md px-2"></span>
          Recording...
        </button>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600">
          Next
        </button>
      </div>
    </div>
  );
};

export default Technical;
