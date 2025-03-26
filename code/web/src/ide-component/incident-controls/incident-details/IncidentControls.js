import { useEffect, useState } from "react"
import './IncidentControls.scss'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Lottie from "lottie-react";
import aiLoading from '../../img/loading.json';
import circleLoading from '../../img/circular-loading.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export const IncidentControls = ({selectedIncident}) => {
    let [resolutionSteps, setResolutionSteps] = useState("");
    let [closureNotes, setClosureNotes] = useState("");
    let [autoHealing, setAutoHealing] = useState(false);
    let [aiText, setAiText] = useState("");


    useEffect(() => {
        console.log("Autohealing")
        if(autoHealing === false){
            return;
        }
        setTimeout(() => {
            setAiText("Finding runbooks to execute")
          }, 2000); // 5 seconds delay
        setTimeout(() => {
            setAiText("Executing runbook")
        }, 4000); // 5 seconds delay
        setTimeout(() => {
            setAiText("Checking status")
        }, 6000); // 5 seconds delay
        setTimeout(() => {
            setAutoHealing(false);
            setAiText("")
        }, 100); // 5 seconds delay
        }, [autoHealing]);

    useEffect(() => {

        console.log("Autohealing")
        setAiText("Analyzing")
        setAutoHealing(true);
        
    
        
      }, [selectedIncident]);

    return (
        <div className="incident-controls">
            <div className="controls-header">
                <h4><b>Resolution</b></h4>
            </div>
            {selectedIncident !== null ? (
            autoHealing ? <div className="auto-heal-section">
            <Lottie animationData={aiLoading} style={{marginRight: "0.2em",width: "1.8em", height: "1.8em"}}/>
            <div className="loading04">
                {aiText.split("").map((element) => {
                    console.log(element)
                    return (element === " " ? <span>&nbsp;</span> : <span>{element}</span>)
                }
                    
                )}
            </div>
        </div> : 
        <div className="remaining-section">
            <AutoHealFailed />
            <ResolutionStepsSection />
            <Closure />
        </div>
    ) : 
        <div className="resolution-null">Please select an incident to work on</div>
        }
        </div>
        
    )
}

export const AutoHealFailed = () => {
    let [expanded, setExpanded] = useState(false);
    
    return (
        <div className="autoheal-failed">
            <div className="autoheal-failed-header">
                <h5 className="resolution-steps-heading">Auto-Heal Failed</h5>
                <p><i>Expand to check logs</i></p>
                <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} onClick={() => {setExpanded(!expanded)}}/>
            </div>
                {expanded && 
                    <p>
                        Auto heal Failed
                    </p>
                }
            </div>
    )
}

export const ResolutionStepsSection = () => {
    let [expanded, setExpanded] = useState(false);
    let [execute, setExecute] = useState(false);
    let [resolved, setResolved] = useState('');

    useEffect(() => {
        if(execute){
            setTimeout(() => {
                setExecute(false); 
                setResolved('done');
                setExpanded(false);
            }, 3000); // 5 seconds delay
        }
    }
    , [execute]);

    return (
        <div className="resolution-steps-section">
            <div className="resolution-steps-header">
                <div style={{display: "flex", alignItems: "center"}}>
                {execute && <Lottie animationData={circleLoading} style={{marginRight: "0.2em",width: "1.8em", height: "1.8em"}}/>}
                <h5 className="resolution-steps-heading">Manual Fix</h5>
                </div>
                {resolved === 'done' && <p style={{color: "green", marginBottom: "0"}}>Resolved</p>}
                <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} onClick={() => {setExpanded(!expanded)}}/>
            </div>
            {expanded && 
                <div className="bottom-section">
                    <Form.Control as="textarea" rows={3} placeholder="Enter Resolution Steps" />
                    { <Button variant="primary" style={{marginTop: "1em", }} onClick={() => {setExecute(true)}} disabled={resolved === 'done'}>Execute</Button>}
                </div>
            }
        </div>
    )
}

export const Closure  = () => {
    let [expanded, setExpanded] = useState(false);
    let [execute, setExecute] = useState(false);
    let [resolved, setResolved] = useState('');

    useEffect(() => {
        if(execute){
            setTimeout(() => {
                setExecute(false); 
                setResolved('done');
                setExpanded(false);
            }, 2000); // 5 seconds delay
        }
    }
    , [execute]);
    return (
        <div className="closure-section">
            <div className="closure-header">
            {execute && <Lottie animationData={circleLoading} style={{marginRight: "0.2em",width: "1.8em", height: "1.8em"}}/>}
                <h5 className="closure-heading">Closure Notes</h5>
                {resolved === 'done' && <p style={{color: "green", marginBottom: "0"}}>Closed Incident</p>}
                <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} onClick={() => {setExpanded(!expanded)}}/>
            </div>
            
            {expanded && 
                <div className="bottom-section">
                    <Form.Control as="textarea" rows={3} placeholder="Enter Close Notes" />
                    { <Button variant="success" style={{marginTop: "1em", }} onClick={() => {setExecute(true)}} disabled={resolved === 'done'}>Close Incident</Button>}
                </div>
            }
        </div>
    )
}