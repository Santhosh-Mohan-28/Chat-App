import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

// connect frontend to backend
const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // ask username when page loads
    const name = prompt("Enter your name:") || "Anonymous";
    setUsername(name);

    // receive messages from backend
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      text: input,
      sender: username,
    };

    // send message to backend
    socket.emit("sendMessage", newMessage);

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>Chat App</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === username ? "sent" : "received"}`}
          >
            <span className="sender">{msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
