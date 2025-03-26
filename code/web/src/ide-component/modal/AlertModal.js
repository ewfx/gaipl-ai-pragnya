// AlertModal.js
// This component renders a modal to display alerts related to a selected incident.
// It uses context for modal management and incident state.

import React, { useEffect, useRef } from 'react';
import './Modal.css';
import { useModal } from '../../context/ModalContext';
import { Alerts } from '../alerts/Alerts';
import { useIncident } from '../../context/IncidentContext';
import { alertModal } from './modalconstant';

/**
 * AlertModal Component
 * Displays incident-related alerts using the Alerts component.
 * It is managed using the ModalContext and IncidentContext.
 */
const AlertModal = () => {
  // Access modal state management using context
  const { isModalOpen, closeModal } = useModal();
  // Access the selected incident from IncidentContext
  const { selectedIncident } = useIncident();
  const dialogRef = useRef(null);

  /**
   * Focuses on the modal when it is opened for better accessibility.
   */
  useEffect(() => {
    if (isModalOpen(alertModal) && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isModalOpen]);

  // Return null if the modal is not open
  if (!isModalOpen(alertModal)) return null;

  return (
    <div className="modal-dep-backdrop">
      <div 
        className="alert-modal modal-dep-content" 
        role="dialog" 
        tabIndex={-1} 
        ref={dialogRef}
        aria-modal="true" 
        aria-labelledby="Incident Related Alerts" 
        aria-describedby="Incident Related Alerts"
      >
        {/* Header Section with Title and Close Button */}
        <div className="modal-dep-header">
          <h3>Alerts</h3>
          <button onClick={() => closeModal(alertModal)} className="close-btn">X</button>
        </div>

        {/* Content Section with Alerts Component */}
        <div className="modal-dep-body">
          <Alerts selectedIncident={selectedIncident} />
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
