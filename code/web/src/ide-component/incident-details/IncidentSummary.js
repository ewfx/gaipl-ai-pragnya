import { useEffect, useState } from "react"
import './IncidentSummary.css'
import Button from 'react-bootstrap/Button';
import openai from '../img/openai.svg'

export const IncidentSummary = ({}) => {

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
            <p>
                <b>What is this incident about?</b><br />
                On March 21, 2025, at 3:15 PM UTC, multiple users reported slow response times and intermittent failures when accessing the customer portal. The issue persisted for approximately 45 minutes before stabilizing. Monitoring tools detected a spike in database query response times, leading to degraded application performance.
                <br />
                <br />
                <b>Root cause analysis:</b><br />
                Based on my analysis of the alerts, the incident was triggered by an unoptimized database query that resulted in a high number of locked rows. The query was executed as part of a scheduled background process, causing contention with real-time user transactions. Logs indicate a sharp increase in deadlock events, further exacerbating the slowdown.
                <br />
                <br />
                <b>Possible Solution:</b><br />

                Optimize the problematic query by adding appropriate indexing and reducing the number of locked rows.

                Modify the background process to execute during off-peak hours to minimize impact on live users.

                Implement query timeout mechanisms to prevent long-running queries from affecting overall system performance.

                Set up proactive alerting for database deadlocks and slow queries to enable faster detection and resolution.
                </p>
            </div>
        </div>        
    )
}