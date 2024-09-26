import { apiService } from 'services';

import queryClient from 'query-client';

import { User } from 'types';

apiService.on('error', (error) => {
  if (error.status === 401) {
    queryClient.setQueryData<User | null>(['account'], null);
  }
});