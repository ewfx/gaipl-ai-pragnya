import React, { createContext, useContext, useState } from 'react';

// Create Incident Context
const IncidentContext = createContext();

export const IncidentProvider = ({ children }) => {
  const [selectedIncident, setSelectedIncidentInContext] = useState(null);

  return (
    <IncidentContext.Provider value={{ selectedIncident, setSelectedIncidentInContext }}>
      {children}
    </IncidentContext.Provider>
  );
};

// Custom Hook for easy access
export const useIncident = () => useContext(IncidentContext);
