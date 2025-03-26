import './IncidentCard.css'

export const IncidentCard = ({incident, setSelectedIncident}) => {    
    return (
        <div className="incident-card" onClick={() => {setSelectedIncident(incident); console.log(incident)}}>
            <h4 className="incident-number">{incident.incident_id}</h4>
            <h4 className="incident-priority">{incident.priority}</h4>
        </div>
    )
}