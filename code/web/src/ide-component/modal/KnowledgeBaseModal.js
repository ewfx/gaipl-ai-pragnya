/**
 * KnowledgeBaseModal Component
 * 
 * This component renders a modal displaying the Knowledge Base.
 * It uses the `useModal` hook to manage modal state and ensure proper rendering.
 * 
 * @component
 * @example
 * return <KnowledgeBaseModal />;
 */

import React from 'react';
import './Modal.css';
import { KnowledgeBase } from '../knowledge-base/Knowledgebase';
import { useModal } from '../../context/ModalContext';
import { knowledgeBaseModal } from './modalconstant';

/**
 * Renders a Knowledge Base Modal if the modal is open.
 * 
 * @returns {JSX.Element|null} The rendered modal or null if closed.
 */
const KnowledgeBaseModal = () => {
  const { isModalOpen, closeModal } = useModal();

  // Return null if modal is not open
  if (!isModalOpen(knowledgeBaseModal)) return null;

  return (
    <div className="modal-dep-backdrop" role="dialog" aria-modal="true" aria-labelledby="knowledgeBaseTitle" aria-describedby="knowledgeBaseContent">
      <div className="modal-dep-content">
        {/* Header Section with Title and Close Button */}
        <div className="modal-dep-header">
          <h3 id="knowledgeBaseTitle">Knowledge Base</h3>
          <button 
            onClick={() => closeModal(knowledgeBaseModal)} 
            className="close-btn" 
            aria-label="Close Knowledge Base Modal"
          >
            X
          </button>
        </div>

        {/* Content Section for the Knowledge Base Component */}
        <div className="modal-dep-body" id="knowledgeBaseContent">
          <KnowledgeBase />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseModal;
