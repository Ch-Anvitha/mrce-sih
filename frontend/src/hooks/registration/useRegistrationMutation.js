import { useMutation } from '@tanstack/react-query';
import { submitRegistration } from '@/services/registration/registrationApi';

export const useRegistrationMutation = () => {
  return useMutation({
    mutationFn: (formDataState) => submitRegistration(formDataState),
  });
};
