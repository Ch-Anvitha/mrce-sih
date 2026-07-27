import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  approveRegistration,
  rejectRegistration,
  lockRegistration,
  unlockRegistration,
} from '@/services/registration/registrationApi';

export function useRegistrationActions() {
  const queryClient = useQueryClient();

  const invalidateQueries = (registrationId) => {
    // Invalidate the specific registration query
    queryClient.invalidateQueries({ queryKey: ['admin', 'registration', registrationId] });
    // Invalidate the dashboard statistics
    queryClient.invalidateQueries({ queryKey: ['admin', 'dashboard', 'statistics'] });
    // Invalidate the registrations list table
    queryClient.invalidateQueries({ queryKey: ['admin', 'registrations'] });
  };

  const approveMutation = useMutation({
    mutationFn: ({ id, remarks }) => approveRegistration(id, remarks),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Registration approved successfully.');
      invalidateQueries(variables.id);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to approve registration.');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, remarks }) => rejectRegistration(id, remarks),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Registration rejected successfully.');
      invalidateQueries(variables.id);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reject registration.');
    },
  });

  const lockMutation = useMutation({
    mutationFn: ({ id }) => lockRegistration(id),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Registration locked successfully.');
      invalidateQueries(variables.id);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to lock registration.');
    },
  });

  const unlockMutation = useMutation({
    mutationFn: ({ id }) => unlockRegistration(id),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Registration unlocked successfully.');
      invalidateQueries(variables.id);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to unlock registration.');
    },
  });

  return {
    approve: approveMutation.mutate,
    isApproving: approveMutation.isPending,
    reject: rejectMutation.mutate,
    isRejecting: rejectMutation.isPending,
    lock: lockMutation.mutate,
    isLocking: lockMutation.isPending,
    unlock: unlockMutation.mutate,
    isUnlocking: unlockMutation.isPending,
  };
}
