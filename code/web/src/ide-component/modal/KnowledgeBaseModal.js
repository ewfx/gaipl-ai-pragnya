// DiagramModal.js
import React from 'react';

import './knowledgeBaseModal.css';
import {dependencyTreeModalId} from './modalconstant';
import { useModal } from './ModalContext';
import BasicFlow from './DependencyMapping';
import { KnowledgeBase } from '../knowledge-base/Knowledgebase';

const knowledgeBaseModal = () => {
  const { isModalOpen, closeModal } = useModal();

  if (!isModalOpen(knowledgeBaseModal)) return null;

  return (
    <div className="modal-dep-backdrop">
      <div className="modal-dep-content">
        {/* Header Section with Title and Close Button */}
        <div className="modal-dep-header">
          <h3>Dependency Diagram</h3>
          <button onClick={()=> {closeModal(knowledgeBaseModal)}} className="close-btn">X</button>
        </div>

        {/* Content Section for the React Flow Diagram */}
        <div className="modal-dep-body">
        <KnowledgeBase />
        </div>
      </div>
    </div>
  );
};

export default DiagramModal;
