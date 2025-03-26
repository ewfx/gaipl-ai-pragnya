import { useEffect, useState } from "react";
import './Alerts.css';
import Incidents from './Incidents.json';
import AlertDetails from './AlertDetails';

/**
 * Alerts Component
 * 
 * This component displays alert information based on the selected incident.
 * If no incident is selected, it prompts the user to select one.
 *
 * Props:
 * @param {Object|null} selectedIncident - The selected incident object or null if no incident is selected.
 */
export const Alerts = ({ selectedIncident }) => {
  // State to store the list of incidents
  const [incidentList, setIncidentList] = useState(Incidents);

  /**
   * Logs the selected incident to the console whenever it changes.
   */
  useEffect(() => {
    console.log('Selected Incident:', selectedIncident);
  }, [selectedIncident]);

  return (
    <>
      {selectedIncident === null ? (
        <div className="alerts-null">
          <h4 className="alert-heading"><b>Alerts</b></h4>
          <div className="select-incident-message">Please select an incident to work on</div>
        </div>
      ) : (
        <div className="alerts">
          <h4 className="alert-heading"><b>Alerts</b></h4>
          {/* Displays detailed alerts using AlertDetails component */}
          <AlertDetails alerts={selectedIncident.correlated_alerts} />
        </div>
      )}
    </>
  );
};