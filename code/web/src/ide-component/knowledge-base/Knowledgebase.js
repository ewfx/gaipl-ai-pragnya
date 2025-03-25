import { useEffect, useState } from "react"
import './KnowledgeBase.css'
import KnowledgeBaseCard from "./KnowledgeBaseCard"

export const KnowledgeBase = ({selectedIncident, relevantKnowledgebase}) => {
    let [knowledgeBase, setKnowledgeBase] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8000/kb/", {
            method: "GET",
            mode: "cors",  // Ensures cross-origin request
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(data => {console.log(data['knowledge_articles']); setKnowledgeBase(data['knowledge_articles'])})
    },[])

    return (
        selectedIncident === null ?
            <div className="knowledge-base-empty-panel">
                Please select an incident to work on
            </div> : 
        <div className="knowledge-base">
            <h4 className="knowledge-base-heading"><b>Knowledge Base</b></h4> 
            <div className="knowledge-base-details">
                {
                    knowledgeBase.map((item,index)=>{
                       return <KnowledgeBaseCard knowledgebasearticle={item} key={index}></KnowledgeBaseCard>
                    })
                }
            </div>       
        </div>
        
    )
}