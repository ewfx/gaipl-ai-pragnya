import { useEffect, useState } from "react"
import './Alerts.css'

import AlertDetails from './AlertDetails';

export const Alerts = ({selectedIncident}) => {
    
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