import { useMutation } from '@tanstack/react-query';
import { updateRegistration } from '@/services/registration/registrationApi';

export const useEditRegistrationMutation = () => {
  return useMutation({
    mutationFn: ({ registrationId, editCode, formDataState }) => 
      updateRegistration(registrationId, editCode, formDataState),
  });
};
