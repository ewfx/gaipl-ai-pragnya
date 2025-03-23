import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({});

  const openModal = (modalId) => {
    setModals((prev) => ({ ...prev, [modalId]: true }));
  };

  const closeModal = (modalId) => {
    setModals((prev) => ({ ...prev, [modalId]: false }));
  };

  const isModalOpen = (modalId) => !!modals[modalId];

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
