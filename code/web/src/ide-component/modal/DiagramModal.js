// DiagramModal.js
import React from 'react';

import './Modal.css';
import { useModal } from '../../context/ModalContext';
import { dependencyTreeModalId } from './modalconstant';
import BasicFlow from '../dependency-tree/DependencyMapping';

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
