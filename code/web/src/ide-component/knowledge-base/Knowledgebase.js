import { useEffect, useState } from "react"
import './KnowledgeBase.css'
import knowledgebase from './knowledge_base.json'
import KnowledgeBaseCard from "./KnowledgeBaseCard"

export const KnowledgeBase = ({relevantKnowledgebase}) => {
    
    useEffect(() => {
        console.log('knowledgebase',knowledgebase)
    },[relevantKnowledgebase])

    return (
        
        <div className="knowledge-base">
            <h4 className="knowledge-base-heading"><b>Knowledge Base</b></h4> 
            <div className="knowledge-base-details">
                {
                    knowledgebase.knowledge_articles.map((item,index)=>{
                       return <KnowledgeBaseCard knowledgebasearticle={item} key={index}></KnowledgeBaseCard>
                    })
                }
            </div>       
        </div>
        
    )
}