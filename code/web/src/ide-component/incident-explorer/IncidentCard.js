import { useEffect, useState } from "react"
import './IncidentCard.css'

export const IncidentCard = ({incident, selectedIncident, setSelectedIncident}) => {   

    const getBorderColor = () => {
        return incident.priority.toLowerCase();
    }

    
    
    return (
        <div className={(incident === selectedIncident ? "incident-card selected " : "incident-card ") + (getBorderColor())} onClick={() => {setSelectedIncident(incident); console.log(incident)}}>
            <div className="incident-card-header">
                <h5 className="incident-number">{incident.incident_id}</h5>
                <h5 className="incident-priority">{incident.priority}</h5>
            </div>
            <div className="incident-card-body">
                <p className="incident-short-description">{incident.short_description}</p>
            </div>
        </div>
    )
}