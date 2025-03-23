import { useEffect, useState } from "react"
import './IncidentDetails.css'
import Incidents from './Incidents.json' ;
import { IncidentSummary } from "./IncidentSummary";
import moment from 'moment';

export const IncidentDetails = ({selectedIncident}) => {
    let [incidentList, setIncidentList] = useState(Incidents);
    
    useEffect(() => {
        console.log(selectedIncident)
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
                    
                </div>
                <div className="caller-assignee-details">
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
                    
                </div>
                <div className="incident-heading-right">
                        
                        <h5 className="incident-created-on" ><b>Created on:</b> &nbsp;{moment(selectedIncident.created_at).format("YYYY-MM-DD HH:mm:ss")}</h5>
                    </div>
                <div className="incident-description">
                    <h5><b>Description: </b></h5>
                    <p>                
                        {selectedIncident.short_description}                
                    </p>
                </div>
                <IncidentSummary />
            </div>
        }
        </div>
        
    )
}