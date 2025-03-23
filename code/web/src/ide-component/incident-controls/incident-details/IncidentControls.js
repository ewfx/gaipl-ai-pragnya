import { useEffect, useState } from "react"
import './IncidentControls.css'
import Incidents from './Incidents.json' ;
import moment from 'moment';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export const IncidentControls = ({selectedIncident}) => {
    let [incidentList, setIncidentList] = useState(Incidents);
    
    useEffect(() => {
        console.log(selectedIncident)
    },[selectedIncident])

    return (
        <div className="incident-controls">
            <div className="incident-controls-heading">
                <h4 className="incident-number" ><b>Incident Controls</b></h4>                
            </div>
            <div className="incident-controls-body">
            <Tabs
                defaultActiveKey="profile"                
                className="tab-group"
                >
                <Tab eventKey="resolution" title="Resolution Steps">
                    Tab content for Home
                </Tab>
                <Tab eventKey="close-notes" title="Closure Notes">
                    Tab content for Profile
                </Tab>
            </Tabs>          
            </div>
        </div>
        
    )
}