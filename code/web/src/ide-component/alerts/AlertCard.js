import React, { useState } from 'react';
import './AlertCard.css'

const AlertCard = ({ title, alert }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`alert-card-container ${isOpen ? 'active' : ''}`}>      {
        /* Header with Title and Arrow */}
      <div className="alert-card-header" onClick={toggleCard}>
        <h5>{title}</h5>
        <h5>{isOpen ? '▲' : '▼'}</h5>
      </div>

      {/* Collapsible Body */}
      {isOpen && (
        <div className="alert-card-body">
          <h5>{alert.description}</h5>
          <h5><b>Serverity</b> : {alert.severity}</h5>
          <h5><b>Status</b> : {alert.status}</h5>

        </div>
      )}
    </div>
  );
};

export default AlertCard;
