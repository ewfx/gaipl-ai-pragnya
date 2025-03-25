import { useEffect, useState } from "react"
import './Alerts.css'
import Incidents from './Incidents.json' ;
import AlertDetails from './AlertDetails';

export const Alerts = ({selectedIncident}) => {
    let [incidentList, setIncidentList] = useState(Incidents);
    
    useEffect(() => {
        console.log('alerts',selectedIncident)
    },[selectedIncident])

    return (
        <>
        
        {
            selectedIncident === null ?
            <div className="alerts-null">
                Please select an incident to work on
            </div> : 
            <div className="alerts">
                <h4 className="alert-heading"><b>Alerts</b></h4>
                <AlertDetails alerts = {selectedIncident.correlated_alerts} />
            </div>
            
        }
        </>
        
    )
}