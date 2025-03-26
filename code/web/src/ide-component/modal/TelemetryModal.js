// DiagramModal.js
import React from 'react';
import './Modal.css';
import { useModal } from '../../context/ModalContext';
import TelemetryGroupChart from '../telemetry/TelemetryGroupChart';
import { telemetryModal } from './modalconstant';
import { useIncident } from '../../context/IncidentContext';

const TelemetryModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const {selectedIncident} = useIncident();

  if (!isModalOpen(telemetryModal)) return null;

  return (
    <div className="modal-dep-backdrop">
      <div className="modal-dep-content">
        {/* Header Section with Title and Close Button */}
        <div className="modal-dep-header">
          <h3>Telemetry Deep Dive</h3>
          <button onClick={()=> {closeModal(telemetryModal)}} className="close-btn">X</button>
        </div>

        {/* Content Section for the React Flow Diagram */}
        <div className="modal-dep-body">
            <TelemetryGroupChart selectedIncident ={selectedIncident} />
        </div>
      </div>
    </div>
  );
};

export default TelemetryModal;
