// DiagramModal.js
import React from 'react';

import './DiagramModal.css';
import {dependencyTreeModalId} from './modalconstant';
import { useModal } from './ModalContext';
import BasicFlow from './DependencyMapping';

const DiagramModal = () => {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen(dependencyTreeModalId)) return null;

  return (
    <div className="modal-dep-backdrop">
      <div className="modal-dep-content">
        {/* Header Section with Title and Close Button */}
        <div className="modal-dep-header">
          <h3>Live Dependency Mapping</h3>
          <button onClick={()=> {closeModal(dependencyTreeModalId)}} className="close-btn">X</button>
        </div>

        {/* Content Section for the React Flow Diagram */}
        <div className="modal-dep-body">
        <BasicFlow />
        </div>
      </div>
    </div>
  );
};

export default DiagramModal;
