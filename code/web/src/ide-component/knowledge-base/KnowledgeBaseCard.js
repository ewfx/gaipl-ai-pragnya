import './KnowledgeBaseCard.css'
const KnowledgeBaseCard = ({knowledgebasearticle}) => {
    return (
        <div className='knowledgebase-card-container'>
            <div><h4><b>{knowledgebasearticle.article_id}</b></h4></div>
            <div>
                <h5><b>{knowledgebasearticle.title}</b></h5>
                <div><p>{knowledgebasearticle.issue_description}</p></div>
            </div>
            
            <div>
                <div><h5><b>Resolution Steps:</b></h5></div>
                <div>
                    {
                        knowledgebasearticle.resolution_steps.map((item,index)=>{
                            return <li key={index}><p><b>{`${index+1}.`}</b>{` ${item}`}</p></li>
                        })
                    }
                </div>
            </div>
        </div>   
    )
}

export default KnowledgeBaseCard;