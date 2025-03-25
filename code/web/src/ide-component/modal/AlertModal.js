// DiagramModal.js
import React from 'react';
import './Modal.css';
import { useModal } from '../../context/ModalContext';
import { Alerts } from '../alerts/Alerts';
import { useIncident } from '../../context/IncidentContext';
import { alertModal } from './modalconstant';

const AlertModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const {selectedIncident} = useIncident();

  if (!isModalOpen(alertModal)) return null;

  return (
    <div className="modal-dep-backdrop">
      <div className="alert-modal modal-dep-content">
        {/* Header Section with Title and Close Button */}
        <div className="modal-dep-header">
          <h3>Alerts</h3>
          <button onClick={()=> {closeModal(alertModal)}} className="close-btn">X</button>
        </div>

        {/* Content Section for the React Flow Diagram */}
        <div className="modal-dep-body">
           <Alerts selectedIncident={selectedIncident} />
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
