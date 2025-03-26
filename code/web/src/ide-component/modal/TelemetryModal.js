// TelemetryModal.js
// This component displays a modal window for viewing detailed telemetry data related to a selected incident.

import React from 'react';
import './Modal.css';
import { useModal } from '../../context/ModalContext';
import TelemetryGroupChart from '../telemetry/TelemetryGroupChart';
import { telemetryModal } from './modalconstant';
import { useIncident } from '../../context/IncidentContext';

const TelemetryModal = () => {
  // Access modal state and control functions using context
  const { isModalOpen, closeModal } = useModal();
  const { selectedIncident } = useIncident();

  // Prevent rendering if the modal is not open
  if (!isModalOpen(telemetryModal)) return null;

  return (
    <div className="modal-dep-backdrop" aria-modal="true" role="dialog" aria-labelledby="telemetry-modal-title">
      <div className="modal-dep-content">
        {/* Header Section with Title and Close Button */}
        <div className="modal-dep-header">
          <h3 id="telemetry-modal-title">Telemetry Deep Dive</h3>
          <button onClick={() => closeModal(telemetryModal)} className="close-btn" aria-label="Close Telemetry Modal">X</button>
        </div>

        {/* Content Section displaying the telemetry chart */}
        <div className="modal-dep-body">
          <TelemetryGroupChart selectedIncident={selectedIncident} />
        </div>
      </div>
    </div>
  );
};

export default TelemetryModal;
