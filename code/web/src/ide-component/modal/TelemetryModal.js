// DiagramModal.js
import React from 'react';
import './Modal.css';
import { useModal } from '../../context/ModalContext';
import TelemetryGroupChart from '../telemetry/TelemetryGroupChart';
import { telemetryModal } from './modalconstant';

const TelemetryModal = () => {
  const { isModalOpen, closeModal } = useModal();

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
            <TelemetryGroupChart />
        </div>
      </div>
    </div>
  );
};

export default TelemetryModal;
