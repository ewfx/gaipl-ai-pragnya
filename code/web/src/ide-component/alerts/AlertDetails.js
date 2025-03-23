import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AlertDetails.css';
import AlertCard from './AlertCard';

const AlretDetails = ({alerts}) => {
  return (
      <div className='alert-details-container'>
        {alerts.map((alert, index) => 
          <AlertCard key={alert.alert_id} title={`${alert.alertname} | ${alert.host}`} alert={alert} />
        )}
      </div>
  );
};

export default AlretDetails;
