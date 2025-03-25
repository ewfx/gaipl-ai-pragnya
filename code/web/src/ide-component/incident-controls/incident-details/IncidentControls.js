import { useEffect, useState } from "react"
import './IncidentControls.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";

export const IncidentControls = ({selectedIncident}) => {
    let [resolutionSteps, setResolutionSteps] = useState("");
    let [closureNotes, setClosureNotes] = useState("");
    
    useEffect(() => {
        console.log(selectedIncident)
    },[selectedIncident])

    return (
        <div className="incident-controls">
            <div className="incident-controls-heading">
                <h4 className="incident-number" ><b>Incident/Change Controls</b></h4>                
            </div>
            <div className="incident-controls-body">
            <Tabs
                defaultActiveKey="resolution"                
                className="tab-group"
                >
                <Tab eventKey="resolution" title="Resolution Steps" >
                    <div className="resolution-steps">
                        <Form.Control as="textarea" rows={8} placeholder="Enter Implementation Plan" value={resolutionSteps} onChange={(e) => {setResolutionSteps(e.target.value)}}/>
                            <Button variant="primary" className="execute-button">Create CR</Button>
                    </div>
                </Tab>
                <Tab eventKey="close-notes" title="Closure Notes">
                    <div className="resolution-steps">
                        <Form.Control as="textarea" rows={8} placeholder="Enter closure notes" value={closureNotes} onChange={(e) => {setClosureNotes(e.target.value)}}/>
                            <Button variant="success" className="close-button">Close Incident</Button>
                    </div>
                </Tab>
            </Tabs>          
            </div>
        </div>
        
    )
}