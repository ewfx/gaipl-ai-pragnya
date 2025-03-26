import React, { useState } from 'react';
import './AlertCard.css'
import moment from 'moment';


const AlertCard = ({ title, alert }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleCard()} className={`alert-card-container ${alert.severity.toLowerCase()} ${isOpen ? 'active' : ''}`}>      {
        /* Header with Title and Arrow */}
      <div className="alert-card-header" onClick={toggleCard}>
        <h5>{title}</h5>
        <h5 className={`arrow ${isOpen ? 'rotate' : ''}`}>▼</h5>
      </div>

      {/* Collapsible Body */}
      {true && (
        <div className="alert-card-body">
          <h5>{alert.description}</h5>
          <h5><b>Alert ID</b> : {alert.alert_id}</h5>
          <h5><b>Serverity</b> : {alert.severity}</h5>
          <h5><b>Status</b> : {alert.status}</h5>
          <h5><b>Event Name</b> : {alert.eventName}</h5>
          <h5><b>Created On</b> : {moment(alert.timestamp).format("YYYY-MM-DD HH:mm:ss")}</h5>
        </div>
      )}
    </div>
  );
};

export default AlertCard;
