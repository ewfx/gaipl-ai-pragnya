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
import Split from 'react-split';
import { Header } from './header/Header';
const IDELandingPage = () => {
  let [selectedIncident, setSelectedIncident] = useState(null);
  let [relevantKnowledgeBase, setRelevantKnowledgeBase] = useState(null);

  return (
    <>
    
    <div className="landing-page-container">
      
      {/* Content Section (90%) */}
      <div className="ide">
      <Split
        className="split-vertical"
        direction="vertical"
        sizes={[45, 45]} // Adjust initial size
        minSize={100} // Minimum size for each panel
        gutterSize={8} // Set the size of the separator
      >
            <div className='top-section'>
            <Split
              className="split-horizontal"
              direction="horizontal"
              sizes={[25, 30, 25, 20]} // 4 Equal parts
              minSize={100}
              gutterSize={8}
            >
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
                <DependencyTree selectedIncident = {selectedIncident} />
              </div>
              </Split>
            </div>
            <div className='bottom-section'>
            <Split
              className="split-horizontal"
              direction="horizontal"
              sizes={[33, 33, 34]} // 3 Equal parts
              minSize={100}
              gutterSize={8}
            >
                <div className="knowledge-base-container">
                  <KnowledgeBase relevantKnowledgeBase={relevantKnowledgeBase} selectedIncident = {selectedIncident}/>
                </div>
                <div className="ai-chat-container">
                  <AiChat selectedIncident={selectedIncident} />
                </div>
                <div className="incident-controls-container">
                  <IncidentControls />
                </div>
                </Split>
              </div>
            </Split>
      </div>
      
      {/* <div className="tools-container" >
          <Tools />
      </div> */}
    </div>
    </>
    )

  };

export default IDELandingPage;
