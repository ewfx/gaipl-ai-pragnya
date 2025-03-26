import { useEffect } from 'react';
import './AiChat.css';
import ChatBox from './ChatBox';

/**
 * AiChat Component
 * -----------------
 * This component renders the AI chat interface with a heading and a ChatBox component.
 * 
 * Props:
 * - selectedIncident: Object containing incident details (e.g., incident_id).
 * - chatSessionId: Unique identifier for the chat session.
 * 
 * Features:
 * - Displays a personalized greeting if an incident is selected.
 * - Maintains a clean and responsive UI using AiChat.css.
 */
export const AiChat = ({ selectedIncident, chatSessionId }) => {    

  // Effect Hook
  // ------------
  // This useEffect hook is prepared to handle future side effects, if needed, 
  // when the `selectedIncident` changes.
  useEffect(() => {
    // Placeholder for any side effects
  }, [selectedIncident]);

  return (
    <div className="ai-chat" id="ai-chat">
      {/* AI Chat Heading */}
      <h4 className="alert-heading"><b>AI-Prajña</b></h4>

      {/* ChatBox Component
          Displays an initial message based on whether an incident is selected.
      */}
      <ChatBox
        initialMessage={
          selectedIncident
            ? `Hi, How can I assist you with the incident ${selectedIncident.incident_id}`
            : ''
        }
        chatSessionId={chatSessionId}
      />
    </div>
  );
};
