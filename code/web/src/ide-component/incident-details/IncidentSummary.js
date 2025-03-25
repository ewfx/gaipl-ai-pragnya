import { useEffect, useState } from "react"
import './IncidentSummary.scss'
import Button from 'react-bootstrap/Button';
import openai from '../img/openai.svg'
import Markdown from "markdown-to-jsx";
import loadingAnim from '../img/loading.json'
import Lottie from "lottie-react";

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
            {summary === null && <div className="loading"><Lottie className="loading-animation" animationData={loadingAnim} loop={true}/>
                <div className="loading-text loading04">
                <span>A</span>
                <span>n</span>
                <span>a</span>
                <span>l</span>
                <span>y</span>
                <span>z</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                </div>
            </div>}
            <div className="summary-body">
                {summary && <Markdown>{summary}</Markdown>}
            </div>
        </div>        
    )
}