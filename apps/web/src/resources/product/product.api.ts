import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import queryClient from 'query-client';

import { ApiError, DeleteParams, ListResult, PaginationSchema, Product } from 'types';

export const useList = <T extends PaginationSchema>(params: T) =>
  useQuery<ListResult<Product>>({
    queryKey: ['products', params],
    queryFn: () => apiService.get('/products/list', params),
  });

export const useCreateProduct = <T = FormData>() =>
  useMutation<Product, ApiError, T>({
    mutationFn: (data: T) => apiService.put('/products/new', data),
    onSuccess: (data) => {
      queryClient.setQueryData(['ownProducts'], (oldData: Product[] | undefined) => [data, ...(oldData || [])]);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

export const useListOwn = (options = {}) =>
  useQuery<Product[]>({
    queryKey: ['ownProducts'],
    queryFn: () => apiService.get('/products/list-own'),
    staleTime: 45000,
    ...options,
  });

export const useRemoveProduct = () =>
  useMutation<void, ApiError, DeleteParams>({
    mutationFn: (data) => apiService.delete(`/products/${data.id}`),
    onSuccess: (_, params) => {
      queryClient.setQueryData(['ownProducts'], (oldData: Product[] | undefined) =>
        oldData?.filter((product) => product._id !== params.id),
      );
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
