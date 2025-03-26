import { useEffect, useState } from "react"
import './IncidentCard.css'

export const IncidentCard = ({incident, selectedIncident, setSelectedIncident}) => {   

    const getBorderColor = () => {
        return incident.priority.toLowerCase();
    }


    
    return (
        <div className={(incident === selectedIncident ? "incident-card selected " : "incident-card ") + (getBorderColor())} 
                onClick={() => {setSelectedIncident(incident);}}
                role="button"
                tabIndex="0"
                aria-labelledby={`incident-number-${incident.incident_id}`}
                aria-describedby={`incident-desc-${incident.incident_id}`}
                aria-label={`Incident ${incident.incident_id}, Priority ${incident.priority}, ${incident.short_description}`}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedIncident(incident)}

        >
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