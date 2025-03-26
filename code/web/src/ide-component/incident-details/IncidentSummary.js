import './IncidentSummary.scss'
import openai from '../img/openai.svg'
import Markdown from "markdown-to-jsx";
import LoadingDots from "../ai-chat/LoadingDots";
// import loadingAnim from '../img/loading.json'
// import Lottie from "lottie-react";

export const IncidentSummary = ({summary}) => {

    return (
        <div className="incident-summary">
            <div className="incident-summary-header">
                <img  className="openai"
                src={openai}
                />
                <h5 className="incident-summary-heading"><b>Incident Summary - AI-Prajña</b></h5>
                {/* <Button variant="danger" className="generate-button">Generate</Button> */}
                
            </div>
            
            <div className="summary-body">
                {!summary ? <LoadingDots text={`Analyzing incident data... Generating a precise summary`} />  :  <div className='custom-markdown'><Markdown>{summary}</Markdown></div>}
            </div>
        </div>        
    )
}