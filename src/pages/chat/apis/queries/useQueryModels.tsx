// src/hooks/useFetchModels.ts
import type { ModelType } from '@/data/types';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../apiClient';

const fetchModels = async (): Promise<ModelType[]> => {
  const response = await apiRequest<ModelType[]>('/models','GET');
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