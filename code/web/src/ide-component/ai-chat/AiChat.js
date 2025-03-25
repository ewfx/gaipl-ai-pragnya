import { useEffect } from 'react'
import './AiChat.css'
import ChatBox from "./ChatBox"


export const AiChat = ({selectedIncident}) => {    
    useEffect(() => {
            console.log('Chat Box',selectedIncident)
        },[selectedIncident])
    return (
        <div className="ai-chat" id='ai-chat'>
            <h4 className="alert-heading"><b>Chat AI</b></h4>
            <ChatBox initialMessage={
                selectedIncident ?
                `Hi, How can I assist you with the incident ${selectedIncident.incident_id}`: ``} />
        </div>
    )
}