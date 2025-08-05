// src/hooks/useFetchModels.ts
import type { Model } from '@/data/types';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../apiClient';

const fetchModels = async (): Promise<Model[]> => {
  const response = await apiRequest<Model[]>('/models','GET');
  return response;
};

const useQueryModels = () => {
  return useQuery({
    queryKey: ['models'],
    queryFn: fetchModels,
    staleTime: 1000 * 60 * 10, //cache for 5 minutes
  });
};

export default useQueryModels;