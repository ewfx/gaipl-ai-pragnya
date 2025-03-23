// DiagramModal.js
import React from 'react';
import BasicFlow from './DependencyMapping';
import './DiagramModal.css';
import {dependencyTreeModalId} from './modalconstant';
import { useModal } from './ModalContext';

const DiagramModal = () => {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen(dependencyTreeModalId)) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {/* Header Section with Title and Close Button */}
        <div className="modal-header">
          <h3>Dependency Diagram</h3>
          <button onClick={()=> {closeModal(dependencyTreeModalId)}} className="close-btn">X</button>
        </div>

        {/* Content Section for the React Flow Diagram */}
        <div className="modal-body">
          <BasicFlow />
        </div>
      </div>
    </div>
  );
};

export default DiagramModal;
