import { useEffect } from 'react'
import './AiChat.css'
import ChatBox from "./ChatBox"
import { useState } from 'react'


export const AiChat = ({selectedIncident, chatSessionId}) => {    
    useEffect(() => {
        
    },[selectedIncident])
    return (
        <div className="ai-chat" id='ai-chat'>
            <h4 className="alert-heading"><b>Chat AI</b></h4>
            <ChatBox initialMessage={
                selectedIncident ?
                `Hi, How can I assist you with the incident ${selectedIncident.incident_id}`: ``} chatSessionId={chatSessionId}/>
        </div>
    )
}