// IncidentControls.js
// This component handles the resolution, auto-healing status, and closure management for incidents.

import { useEffect, useState } from "react";
import './IncidentControls.scss';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Lottie from "lottie-react";
import aiLoading from '../../img/loading.json';
import circleLoading from '../../img/circular-loading.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

// Main IncidentControls component
export const IncidentControls = ({ selectedIncident }) => {
    const [autoHealing, setAutoHealing] = useState(false);
    const [aiText, setAiText] = useState("");

    // Effect to handle auto-healing process simulation
    useEffect(() => {
        if (!autoHealing) return;
        const steps = [
            "Finding runbooks to execute",
            "Executing runbook",
            "Checking status"
        ];
        steps.forEach((text, index) => {
            setTimeout(() => setAiText(text), (index + 1) * 2000);
        });
        setTimeout(() => {
            setAutoHealing(false);
            setAiText("");
        }, 10000);
    }, [autoHealing]);

    // Effect to trigger analysis on incident selection
    useEffect(() => {
        if (selectedIncident) {
            setAiText("Analyzing");
            setAutoHealing(true);
        }
    }, [selectedIncident]);

    return (
        <div className="incident-controls">
            <div className="controls-header">
                <h4><b>Resolution</b></h4>
            </div>
            {selectedIncident ? (
                autoHealing ? (
                    <AutoHealingProgress aiText={aiText} />
                ) : (
                    <div className="remaining-section">
                        <AutoHealFailed />
                        <ResolutionStepsSection />
                        <Closure />
                    </div>
                )
            ) : (
                <div className="resolution-null">Please select an incident to work on</div>
            )}
        </div>
    );
};

// Component to display auto-healing progress
const AutoHealingProgress = ({ aiText }) => (
    <div className="auto-heal-section">
        <Lottie animationData={aiLoading} style={{ marginRight: "0.2em", width: "1.8em", height: "1.8em" }} />
        <div className="loading-text">
            {aiText.split('').map((char, index) => <span key={index}>{char === ' ' ? '\u00A0' : char}</span>)}
        </div>
    </div>
);

// Component to display auto-heal failure logs
export const AutoHealFailed = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="autoheal-failed">
            <div className="autoheal-failed-header">
                <h5>Auto-Heal Failed</h5>
                <p><i>Expand to check logs</i></p>
                <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} onClick={() => setExpanded(!expanded)} />
            </div>
            {expanded && <p>Auto heal Failed</p>}
        </div>
    );
};

// Component to handle manual resolution steps
export const ResolutionStepsSection = () => {
    const [expanded, setExpanded] = useState(false);
    const [execute, setExecute] = useState(false);
    const [resolved, setResolved] = useState('');

    useEffect(() => {
        if (execute) {
            setTimeout(() => {
                setExecute(false);
                setResolved('done');
                setExpanded(false);
            }, 3000);
        }
    }, [execute]);

    return (
        <div className="resolution-steps-section">
            <div className="resolution-steps-header">
                <div style={{ display: "flex", alignItems: "center" }}>
                    {execute && <Lottie animationData={circleLoading} style={{ marginRight: "0.2em", width: "1.8em", height: "1.8em" }} />}
                    <h5>Manual Fix</h5>
                </div>
                {resolved === 'done' && <p style={{ color: "green" }}>Resolved</p>}
                <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} onClick={() => setExpanded(!expanded)} />
            </div>
            {expanded && (
                <div className="bottom-section">
                    <Form.Control as="textarea" rows={3} placeholder="Enter Resolution Steps" />
                    <Button variant="primary" onClick={() => setExecute(true)} disabled={resolved === 'done'}>Execute</Button>
                </div>
            )}
        </div>
    );
};

// Component to handle incident closure with notes
export const Closure = () => {
    const [expanded, setExpanded] = useState(false);
    const [execute, setExecute] = useState(false);
    const [resolved, setResolved] = useState('');

    useEffect(() => {
        if (execute) {
            setTimeout(() => {
                setExecute(false);
                setResolved('done');
                setExpanded(false);
            }, 2000);
        }
    }, [execute]);

    return (
        <div className="closure-section">
            <div className="closure-header">
                {execute && <Lottie animationData={circleLoading} style={{ marginRight: "0.2em", width: "1.8em", height: "1.8em" }} />}
                <h5>Closure Notes</h5>
                {resolved === 'done' && <p style={{ color: "green" }}>Closed Incident</p>}
                <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} onClick={() => setExpanded(!expanded)} />
            </div>
            {expanded && (
                <div className="bottom-section">
                    <Form.Control as="textarea" rows={3} placeholder="Enter Close Notes" />
                    <Button variant="success" onClick={() => setExecute(true)} disabled={resolved === 'done'}>Close Incident</Button>
                </div>
            )}
        </div>
    );
};
