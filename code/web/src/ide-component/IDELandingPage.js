import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IDELandingPage.css';
import { IncidentExplorer } from './incident-explorer/IncidentExplorer';
import { IncidentDetails } from './incident-details/IncidentDetails';
import { AiChat } from './ai-chat/AiChat';
import { IncidentControls } from './incident-controls/incident-details/IncidentControls';
import { DependencyTree } from './dependency-tree/DependencyTree';
import Split from 'react-split';
import { useIncident } from '../context/IncidentContext';
import { Alerts } from './alerts/Alerts';

/**
 * IDELandingPage Component
 * Represents the main layout of the application with split sections for incident management.
 */
const IDELandingPage = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [relevantKnowledgeBase, setRelevantKnowledgeBase] = useState(null);
  const [chatSessionId, setChatSessionId] = useState(null);
  const { setSelectedIncidentInContext } = useIncident();

  // Effect to update incident context when a new incident is selected
  useEffect(() => {
    setSelectedIncidentInContext(selectedIncident);
  }, [selectedIncident, setSelectedIncidentInContext]);

  return (
    <div className="landing-page-container">
      <div className="ide">
        {/* Vertical Split for Top and Bottom Sections */}
        <Split className="split-vertical" direction="vertical" sizes={[45, 45]} minSize={100} gutterSize={8}>
          <div className='top-section'>
            {/* Horizontal Split for Incident Explorer, Incident Details, and Alerts */}
            <Split className="split-horizontal" direction="horizontal" sizes={[25, 50, 25]} minSize={100} gutterSize={8}>
              <div className="incident-explorer-container">
                <IncidentExplorer selectedIncident={selectedIncident} setSelectedIncident={setSelectedIncident} chatSessionId={chatSessionId} setChatSessionId={setChatSessionId} />
              </div>
              <div className="incident-details-container">
                <IncidentDetails selectedIncident={selectedIncident} setChatSessionId={setChatSessionId} />
              </div>
              <div className="alerts-container">
                <Alerts selectedIncident={selectedIncident} />
              </div>
            </Split>
          </div>

          <div className='bottom-section'>
            {/* Horizontal Split for Dependency Tree, AI Chat, and Incident Controls */}
            <Split className="split-horizontal" direction="horizontal" sizes={[25, 50, 25]} minSize={100} gutterSize={8}>
              <div className="dependency-mapping-container">
                <DependencyTree selectedIncident={selectedIncident} />
              </div>
              <div className="ai-chat-container">
                <AiChat selectedIncident={selectedIncident} chatSessionId={chatSessionId} />
              </div>
              <div className="incident-controls-container">
                <IncidentControls selectedIncident={selectedIncident} />
              </div>
            </Split>
          </div>
        </Split>
      </div>
    </div>
  );
};

export default IDELandingPage;
