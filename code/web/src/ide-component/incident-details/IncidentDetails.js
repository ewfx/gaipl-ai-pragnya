// IncidentDetails.js
// This component displays detailed information about a selected incident, including the summary and interactive controls for accessing additional information.

import { useEffect, useState } from "react";
import './IncidentDetails.css';
import { IncidentSummary } from "./IncidentSummary";
import { useModal } from "../../context/ModalContext";
import { knowledgeBaseModal, telemetryModal } from "../modal/modalconstant";
import { Activity, BookOpenText } from 'lucide-react';

export const IncidentDetails = ({ selectedIncident, setChatSessionId }) => {

  // State for storing the incident summary
  const [summary, setSummary] = useState(null);

  // Modal context for opening different modals
  const { openModal } = useModal();

  // Handlers for opening specific modals
  const openKnowledgeBaseModal = () => openModal(knowledgeBaseModal);
  const openTelemetry = () => openModal(telemetryModal);


  // Effect to fetch incident summary data when a new incident is selected
  useEffect(() => {
    setSummary(null);

    if (!selectedIncident) return;

    fetch(`http://localhost:9000/ai-connect/incident/${selectedIncident.incident_id}`, {
      method: "POST",
      mode: "cors", // Enables cross-origin requests
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setSummary(data.summary);
        setChatSessionId(data.chat_session_id);
      });
  }, [selectedIncident, setChatSessionId]);

  return (
    <div className="mid-container">
      {selectedIncident ? (
        <div className="incident-details">
          <div className="incident-heading">
            <div className="incident-heading-left">
              <div className="circle-high" />
              <h4 className="incident-number"><b>{selectedIncident.incident_id}</b></h4>
            </div>
            <div className="incident-heading-right icon-container">
              {/* Knowledge Base Icon */}
              <div
                data-title="Knowledge Base"
                className="icon icon-wrapper"
                role="button"
                aria-label="Open Knowledge Base"
                tabIndex="0"
                onClick={openKnowledgeBaseModal}
                onKeyDown={(e) => e.key === 'Enter' && openKnowledgeBaseModal()}
              >
                <BookOpenText color="#3498db" size={25} style={{ filter: 'drop-shadow(0px 0px 8px #3498db)' }} />
              </div>

              {/* Telemetry Icon */}
              <div
                data-title="Telemetry"
                className="icon icon-wrapper"
                role="button"
                aria-label="Open Telemetry Data"
                tabIndex="0"
                onClick={openTelemetry}
                onKeyDown={(e) => e.key === 'Enter' && openTelemetry()}
              >
                <Activity color="#e74c3c" size={25} style={{ filter: 'drop-shadow(0px 0px 8px #e74c3c)' }} />
              </div>
            </div>
          </div>

          {/* Incident Summary Section */}
          <div className="incident-detail-description">
            <div className="incident-summary-section">
              <IncidentSummary summary={summary} />
            </div>
          </div>
        </div>
      ) : (
        <div className="incident-details-null">
          <h4 className="alert-heading"><b>Incident Details</b></h4>
          <div className="select-incident-message">Please select an incident to work on</div>
        </div>
      )}
    </div>
  );
};
