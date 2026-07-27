import { useQuery } from '@tanstack/react-query';
import { getDashboardStatistics } from '@/services/dashboard/dashboardApi';

export function useDashboardQuery(options = {}) {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'statistics'],
    queryFn: getDashboardStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}
