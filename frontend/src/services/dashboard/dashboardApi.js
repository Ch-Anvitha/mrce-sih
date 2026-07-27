import { apiClient } from '@/services/registration/registrationApi';

export const getDashboardStatistics = async () => {
  const response = await apiClient.get('/dashboard/statistics');
  return response.data;
};
