import React, { FC, useLayoutEffect } from 'react';
import { ActionIcon, Badge, Box, ComboboxItem, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';

import { ArrowDownIcon, SwapIcon, XCircleIcon } from 'public/icons';

import { PaginationSchema } from 'types';

import classes from './style.module.css';

const selectOptions: ComboboxItem[] = [
  {
    value: 'desc',
    label: 'Sort by newest',
  },
  {
    value: 'asc',
    label: 'Sort by oldest',
  },
];

interface FiltersProps {
  params: PaginationSchema;
  setParams: (newValue: PaginationSchema) => void;
  onReset: () => void;
  recordCount?: number;
}

const Filters: FC<FiltersProps> = ({ recordCount, params, setParams, onReset }) => {
  const [search, setSearch] = useInputState('');

  const [debouncedSearch] = useDebouncedValue(search, 500);

  const handleSort = (value: string | null) => {
    setParams({ ...params, sort: value as PaginationSchema['sort'] });
  };

  useLayoutEffect(() => {
    setParams({ ...params, searchName: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <>
      <TextInput
        w="100%"
        value={search}
        onChange={setSearch}
        placeholder="Type to search..."
        leftSection={<IconSearch size={16} />}
        rightSection={
          search && (
            <ActionIcon variant="transparent" onClick={() => setSearch('')}>
              <IconX color="gray" stroke={1} />
            </ActionIcon>
          )
        }
        classNames={{
          input: classes.search,
        }}
      />

      <Stack gap={12}>
        <Group justify="space-between">
          {recordCount || recordCount === 0 ? (
            <Text size="md" lh="19px" c="black-600" fw="bold">
              {recordCount} results
            </Text>
          ) : (
            <Box w={1} h={1} />
          )}
          <Select
            size="md"
            data={selectOptions}
            value={params.sort}
            onChange={handleSort}
            allowDeselect={false}
            leftSection={<SwapIcon />}
            rightSection={<ArrowDownIcon />}
            comboboxProps={{
              withinPortal: false,
              transitionProps: {
                transition: 'fade',
                duration: 120,
                timingFunction: 'ease-out',
              },
            }}
          />
        </Group>
        {params.searchPrice && (
          <Badge
            fw="500"
            rightSection={
              <button type="button" onClick={onReset} className={classes.button}>
                <XCircleIcon />
              </button>
            }
            className={classes.badge}
          >
            ${params.searchPrice.from}-${params.searchPrice.to}
          </Badge>
        )}
      </Stack>
    </>
  );
};
export default Filters;
