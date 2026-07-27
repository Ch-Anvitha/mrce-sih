import { useQuery } from '@tanstack/react-query';
import { fetchAdminRegistrations } from '@/services/registration/registrationApi';

export const useAdminRegistrationsQuery = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ['admin', 'registrations', params],
    queryFn: () => fetchAdminRegistrations(params),
    staleTime: 5 * 60 * 1000,
    ...options
  });
};
