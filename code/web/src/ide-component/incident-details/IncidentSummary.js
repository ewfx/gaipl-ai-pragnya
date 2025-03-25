import { useEffect, useState } from "react"
import './IncidentSummary.css'
import Button from 'react-bootstrap/Button';
import openai from '../img/openai.svg'
import Markdown from "markdown-to-jsx";
import LoadingDots from "../ai-chat/LoadingDots";

export const IncidentSummary = ({summary}) => {

    return (
        <div className="incident-summary">
            <div className="incident-summary-header">
                <img  className="openai"
                src={openai}
                />
                <h5 className="incident-summary-heading"><b>Incident Summary - OpenAI</b></h5>
                {/* <Button variant="danger" className="generate-button">Generate</Button> */}
                
            </div>
            <div className="summary-body">
                {!summary ? <LoadingDots text={`Analyzing incident data... Generating a precise summary`} />  :  <Markdown>{summary}</Markdown>}
            </div>
        </div>        
    )
}