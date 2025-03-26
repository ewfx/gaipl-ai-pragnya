// DiagramModal.js

import React from 'react';
import './Modal.css';
import { useModal } from '../../context/ModalContext';
import { dependencyTreeModalId } from './modalconstant';
import BasicFlow from '../dependency-tree/DependencyMapping';

/**
 * DiagramModal Component
 * 
 * This component renders a modal that displays the live dependency mapping using React Flow.
 * It uses a context-based modal management system to control visibility.
 * 
 * @component
 * @returns {JSX.Element|null} The DiagramModal component or null if not open.
 */
const DiagramModal = () => {
  const { isModalOpen, closeModal } = useModal();

  // Return null if the modal is not open
  if (!isModalOpen(dependencyTreeModalId)) return null;

  return (
    <div className="modal-dep-backdrop" role="dialog" aria-modal="true" aria-labelledby="LiveDependencyMappingTitle">
      <div className="modal-dep-content">
        {/* Header Section with Title and Close Button */}
        <div className="modal-dep-header">
          <h3 id="LiveDependencyMappingTitle">Live Dependency Mapping</h3>
          <button 
            onClick={() => closeModal(dependencyTreeModalId)} 
            className="close-btn"
            aria-label="Close Modal"
          >
            X
          </button>
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
