import { useEffect, useState } from "react"
import './IncidentDetails.css'
import { IncidentSummary } from "./IncidentSummary";
import moment from 'moment';
import { useModal } from "../../context/ModalContext";
import { alertModal, knowledgeBaseModal, telemetryModal } from "../modal/modalconstant";
import { BookOpenText, ChartLine, TriangleAlert } from 'lucide-react';

export const IncidentDetails = ({ selectedIncident }) => {

    let [summary, setSummary] = useState(null);
    const { openModal } = useModal();
    const openKnowledgeBaseModal = () => {
        openModal(knowledgeBaseModal);
    };

    const openAlertModal = () => {
        openModal(alertModal);
    };

    const openTelemetry = () => {
        openModal(telemetryModal);
    };


    useEffect(() => {
        setSummary(null)
        if (selectedIncident === null) {
            return;
        }
        fetch("http://localhost:9000/ai-connect/incident/" + selectedIncident.incident_id, {
            method: "POST",
            mode: "cors",  // Ensures cross-origin request
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(data => {
                setSummary(data.summary);
            })
    }, [selectedIncident])
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
                            <div className="incident-heading-right icon-container">
                                <div
                                    className="icon icon-wrapper"
                                    role="button"
                                    aria-label="Open Knowledge Base"
                                    tabIndex="0"
                                    onClick={openKnowledgeBaseModal}
                                    onKeyDown={(e) => e.key === 'Enter' && openKnowledgeBaseModal()}
                                >
                                    <BookOpenText color="green" size={25} />
                                </div>

                                <div
                                    className="icon icon-wrapper"
                                    role="button"
                                    aria-label="View Alerts"
                                    tabIndex="0"
                                    onClick={openAlertModal}
                                    onKeyDown={(e) => e.key === 'Enter' && openAlertModal()}
                                >
                                    <TriangleAlert color="rgb(243, 156, 18)" size={25} />
                                </div>

                                <div
                                    className="icon icon-wrapper"
                                    role="button"
                                    aria-label="Open Telemetry Data"
                                    tabIndex="0"
                                    onClick={openTelemetry}
                                    onKeyDown={(e) => e.key === 'Enter' && openTelemetry()}
                                >
                                    <ChartLine color="green" size={25} />
                                </div>
                            </div>
                        </div>
                        <div className="incident-detail-description">
                            <div className="incident-summary-section">
                                <IncidentSummary summary={summary} />
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