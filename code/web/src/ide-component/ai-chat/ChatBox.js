import React, { useEffect, useState } from 'react';
import { MessageBox, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import Markdown from 'markdown-to-jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lottie from 'lottie-react';
import loadingAnim from '../img/loading.json';
import { Send } from 'lucide-react';
import './ChatBox.scss';

/**
 * ChatBox Component
 * ------------------
 * This component provides a chat interface with AI assistance.
 * Users can type messages, view AI responses, and see a loading animation while waiting for a response.
 *
 * Props:
 * - initialMessage: (string) Optional initial message for the chat.
 * - chatSessionId: (string) Chat session identifier for API requests.
 *
 * Features:
 * - Displays user messages and AI responses.
 * - Supports markdown rendering for AI messages.
 * - Shows loading animation while waiting for AI response.
 * - Allows users to send messages using Enter key or Send button.
 */
const ChatBox = ({ initialMessage, chatSessionId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize chat with an initial message if available
  useEffect(() => {
    if (initialMessage) {
      setMessages([{ position: 'left', type: 'text', text: initialMessage, date: new Date(), notch: false }]);
    } else {
      setMessages([]);
    }
  }, [initialMessage]);

  // Auto-scroll to the latest message or loading animation
  useEffect(() => {
    const messageBoxes = document.querySelectorAll('.rce-container-mbox');
    const loadingDots = document.getElementById('loading-dots');

    if (messageBoxes.length > 1) {
      const scrollTo = loadingDots || messageBoxes[messageBoxes.length - 2];
      scrollTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages, loading]);

  // Handle Enter key to send a message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Send user input and fetch AI response
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { position: 'right', type: 'text', text: input, date: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    fetch('http://localhost:9000/ai-connect/message', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ message: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        const aiMessage = {
          position: 'left',
          type: 'text',
          text: <div className='custom-markdown'><Markdown>{data.answer}</Markdown></div>,
          date: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      })
      .catch(() => {
        setLoading(false);
        const errorMessage = {
          position: 'left',
          type: 'text',
          text: <div className='custom-markdown'><Markdown>{'Something went wrong with AI'}</Markdown></div>,
          date: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      });

    setInput('');
  };

  return (
    <div className='chat-box-container' id='chat-box-container'>
      <div className='chat-box-window' style={{ overflowY: 'auto', padding: '10px', textAlign: 'start' }}>
        {messages.map((msg, index) => (
          <MessageBox key={index} position={msg.position} type={msg.type} text={<div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>} date={msg.date} />
        ))}
        {loading && (
          <div className='loading-section' style={{ display: 'flex', justifyContent: 'flex-start' }} id='loading-dots'>
            <Lottie className='loading-animation' animationData={loadingAnim} loop />
            <div className='loading-text loading04'>Analyzing...</div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className='chat-input-box d-flex'>
        <Input
          placeholder='Type a message...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1 }}
          onKeyDown={handleKeyDown}
        />
        <div onClick={handleSend} className='send-icon' tabIndex={0} role='button' aria-label='Send Message'>
          <Send color='green' />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
