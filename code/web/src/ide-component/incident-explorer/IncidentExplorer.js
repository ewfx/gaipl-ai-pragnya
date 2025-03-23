import { useEffect, useState } from "react"
import './IncidentExplorer.css'
import Incidents from './Incidents.json' ;
import { IncidentCard } from "./IncidentCard";
import Form from 'react-bootstrap/Form';

export const IncidentExplorer = ({selectedIncident, setSelectedIncident}) => {
    let [incidentList, setIncidentList] = useState(Incidents);
    let [filteredIncidents, setFilteredIncidents] = useState(Incidents);
    let [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setFilteredIncidents(
            incidentList.filter((incident) => 
                    incident.incident_id.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }, [searchTerm])
    
    return (
        <div className="incident-explorer">
            <div className="incident-explorer-header">
                <h4 className="incident-explorer-heading"><b>My Incidents</b></h4>
                <Form.Control type="text" placeholder="Search Incident" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}}/>
            </div>
            <div className="incident-card-container">
                {filteredIncidents.map((incident, index) => {
                    return(
                        <IncidentCard incident={incident} selectedIncident={selectedIncident} setSelectedIncident={setSelectedIncident}/>
                    )
                })}
            </div>
        </div>
    )
}