import { ColumnDef } from '@tanstack/react-table';

import { UsersListSortParams } from 'resources/user';

import { PaginationSchema, User } from 'types';

export const DEFAULT_PAGE = 1;
export const PER_PAGE = 6;
export const EXTERNAL_SORT_FIELDS: Array<keyof UsersListSortParams> = ['createdOn'];

export const DEFAULT_PARAMS: PaginationSchema = {
  page: DEFAULT_PAGE,
  perPage: PER_PAGE,
  searchName: '',
  sort: 'desc',
};

export const COLUMNS: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
  },
];
