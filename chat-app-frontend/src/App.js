import React, { useState } from "react";
import "./App.css";

function ChatWindow({ user, setUser, messages, sendMessage, settings, setSettings }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(user, input);
      setInput("");
    }
  };

  return (
    <div className="chat-window">
      <div className="user-settings">
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter username"
          className="username-input"
        />
      </div>

      <div className="settings">
        <label>
          Theme Color:
          <input
            type="color"
            value={settings.bgColor}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, bgColor: e.target.value }))
            }
          />
        </label>
        <label>
          Font Size:
          <input
            type="range"
            min="12"
            max="24"
            value={parseInt(settings.fontSize)}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                fontSize: e.target.value + "px",
              }))
            }
          />
        </label>
      </div>

      <div
        className="messages"
        style={{
          backgroundColor: settings.bgColor,
          fontSize: settings.fontSize,
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.user === user ? "message self" : "message other"}
          >
            <b>{msg.user}:</b> {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([]);

  const [user1, setUser1] = useState("User1");
  const [user2, setUser2] = useState("User2");

  const [user1Settings, setUser1Settings] = useState({
    bgColor: "#111111",
    fontSize: "16px",
  });
  const [user2Settings, setUser2Settings] = useState({
    bgColor: "#111111",
    fontSize: "16px",
  });

  const sendMessage = (user, text) => {
    setMessages([...messages, { user, text }]);
  };

  return (
    <div className="app">
      <ChatWindow
        user={user1}
        setUser={setUser1}
        messages={messages}
        sendMessage={sendMessage}
        settings={user1Settings}
        setSettings={setUser1Settings}
      />
      <ChatWindow
        user={user2}
        setUser={setUser2}
        messages={messages}
        sendMessage={sendMessage}
        settings={user2Settings}
        setSettings={setUser2Settings}
      />
    </div>
  );
}

export default App;
