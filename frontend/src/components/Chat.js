// components/Chat.js
import React, { useEffect, useState } from 'react';
import { sendMessage, listenForMessages, joinRoom } from '../services/Socket'

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [conversationId, setConversationId] = useState(''); // You'll need to set this dynamically

  useEffect(() => {
    if (conversationId) {
      joinRoom(conversationId); // Join the room when the conversationId is set
    }

    // Listen for new messages
    listenForMessages((newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup when component unmounts
    return () => {
      // Optionally, leave the room if needed
    };
  }, [conversationId]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(message, conversationId); // Send message to the backend
      setMessage(''); // Clear the message input
    }
  };

  return (
    <div>
      <h2>Conversation: {conversationId}</h2>

      <div>
        {/* Render the list of messages */}
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender.username}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chat;
