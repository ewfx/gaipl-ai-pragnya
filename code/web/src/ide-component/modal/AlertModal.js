// DiagramModal.js
import React, { useEffect, useRef } from 'react';
import './Modal.css';
import { useModal } from '../../context/ModalContext';
import { Alerts } from '../alerts/Alerts';
import { useIncident } from '../../context/IncidentContext';
import { alertModal } from './modalconstant';

const AlertModal = () => {
  const { isModalOpen, closeModal } = useModal();
  const {selectedIncident} = useIncident();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isModalOpen(alertModal) && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isModalOpen]);

  if (!isModalOpen(alertModal)) return null;

  return (
    <div className="modal-dep-backdrop">
      <div className="alert-modal modal-dep-content" role="dialog" tabIndex={-1} ref={dialogRef}
      aria-modal="true" aria-labelledby="Incident Related Alerts" aria-describedby="Incident Related Alerts">
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
