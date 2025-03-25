import { useEffect, useState } from "react"
import './IncidentDetails.css'
import { IncidentSummary } from "./IncidentSummary";
import moment from 'moment';
import { useModal } from "../../context/ModalContext";
import { alertModal, knowledgeBaseModal } from "../modal/modalconstant";
import { BookOpenText, TriangleAlert } from 'lucide-react';

export const IncidentDetails = ({selectedIncident, setChatSessionId}) => {

    let [summary, setSummary] = useState(null);
    const { openModal } = useModal();
    const openKnowledgeBaseModal = () => {
            openModal(knowledgeBaseModal);
    };

    const openAlertModal = () => {
        openModal(alertModal);
    };   

    
    
    useEffect(() => {
        if(selectedIncident === null){
            return;
        }
        setSummary(null);
        fetch("http://localhost:9000/ai-connect/incident/" + selectedIncident.incident_id, {
            method: "POST",
            mode: "cors",  // Ensures cross-origin request
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          })
            .then(response => {console.log(response.headers.get('Set-Cookie')); return response.json();})
            .then(data => {
                console.log(data)
                console.log(document.cookie)
                setSummary(data.summary);
                setChatSessionId(data.chat_session_id);
            })
    },[selectedIncident])
    return (
        <div className="mid-container">
        {
            selectedIncident === null ?
            <div className="incident-details-null">
                Please select an incident to work on
            </div> : 
            <div className="incident-details">
                <div className="incident-heading">
                    <div className="incident-heading-left">
                        <div className="circle-high" />
                        <h4 className="incident-number" ><b>{selectedIncident.incident_id}</b></h4>
                    </div>
                    <div className="incident-heading-right">
                        <div className="icon" title="Knowledge Base" onClick={openKnowledgeBaseModal}>
                            <BookOpenText color="green" size={34}/>
                        </div>
                        <div className="icon"  title="Alerts" onClick={openAlertModal}>
                            <TriangleAlert color="rgb(243, 156, 18)" size={34} />
                        </div>

                    </div>
                </div>
                <div className="incident-detail-description">
                    <div className="incident-summary-section">
                        <IncidentSummary summary={summary}/>
                    </div>
                    <div className="incident-caller-details">
                        <div className="incident-caller">
                            <h5><b>Created By: &nbsp;</b></h5>
                            <p>                
                                {selectedIncident.caller}                
                            </p>
                        </div>
                        <div className="incident-assignee">
                            <h5><b>Assigned To: &nbsp;</b></h5>
                            <p>                
                                {selectedIncident.assigned_to}                
                            </p>
                        </div>
                        <div>
                        <h5 className="incident-created-on" ><b>Created on:</b> &nbsp;{moment(selectedIncident.created_at).format("YYYY-MM-DD HH:mm:ss")}</h5>
                        </div>
                        <div className="incident-description">
                            <h5><b>Description: </b></h5>
                            <p>                
                                {selectedIncident.short_description}                
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
        
    )
}