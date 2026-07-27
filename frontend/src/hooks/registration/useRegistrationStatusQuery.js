import { useQuery } from '@tanstack/react-query';
import { fetchRegistrationById } from '@/services/registration/registrationApi';

export const useRegistrationStatusQuery = (registrationId, options = {}) => {
  return useQuery({
    queryKey: ['registration', registrationId],
    queryFn: () => fetchRegistrationById(registrationId),
    enabled: !!registrationId,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    ...options
  });
};
