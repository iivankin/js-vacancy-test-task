import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import { ApiError, CreateOrderParams, Order } from 'types';

export const useList = () =>
  useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: () => apiService.get('/orders/list'),
  });

export const useCreateOrder = <T = CreateOrderParams>() =>
  useMutation<{ url: string }, ApiError, T>({
    mutationFn: (data: T) => apiService.put('/orders/new', data),
  });
