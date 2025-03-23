import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IDELandingPage.css';
import { IncidentExplorer } from './incident-explorer/IncidentExplorer';
import { IncidentDetails } from './incident-details/IncidentDetails';
import { Alerts } from './alerts/Alerts';
import { KnowledgeBase } from './knowledge-base/Knowledgebase';
import { AiChat } from './ai-chat/AiChat';
import { IncidentControls } from './incident-controls/incident-details/IncidentControls';
import { DependencyTree } from './dependency-tree/DependencyTree';
const IDELandingPage = () => {
  let [selectedIncident, setSelectedIncident] = useState(null);
  let [relevantKnowledgeBase, setRelevantKnowledgeBase] = useState(null);

  return (
    <div className="landing-page-container">
      
      {/* Content Section (90%) */}
      <div className="ide">
        <div className='top-section'>
          <div className="incident-explorer-container">
            <IncidentExplorer selectedIncident={selectedIncident} setSelectedIncident={setSelectedIncident}/>
          </div>
          <div className="incident-details-container">
            <IncidentDetails selectedIncident={selectedIncident} />
          </div>
          <div className="alerts-container">
          <Alerts selectedIncident={selectedIncident} />
          </div>
          <div className="dependency-mapping-container">
            <DependencyTree />
          </div>
        </div>
        <div className='bottom-section'>
          <div className="knowledge-base-container">
            <KnowledgeBase relevantKnowledgeBase={relevantKnowledgeBase}/>
          </div>
          <div className="ai-chat-container">
            <AiChat />
          </div>
          <div className="incident-controls-container">
            <IncidentControls />
          </div>
        </div>
      </div>
      
      {/* <div className="tools-container" >
          <Tools />
      </div> */}
    </div>
    )

  };

export default IDELandingPage;
