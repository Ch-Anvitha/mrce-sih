import React, { createContext, useContext, useState } from 'react';

const RegistrationContext = createContext(undefined);

export function RegistrationProvider({ children }) {
  // Placeholder state for architecture
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [editSession, setEditSession] = useState({
    isEditMode: false,
    registrationId: null,
    editCode: null,
    status: null,
    isReadOnly: false,
  });

  const value = {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    editSession,
    setEditSession
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
}
