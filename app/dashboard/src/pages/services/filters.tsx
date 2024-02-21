import {
  BoxProps,
  Button,
  chakra,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useDashboard, useServices } from 'stores';
import debounce from 'lodash.debounce';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const iconProps = {
  baseStyle: {
    w: 4,
    h: 4,
  },
};

const SearchIcon = chakra(MagnifyingGlassIcon, iconProps);
const ClearIcon = chakra(XMarkIcon, iconProps);
export const ReloadIcon = chakra(ArrowPathIcon, iconProps);

export type FilterProps = {} & BoxProps;
const setSearchField = debounce((name: string) => {
  useServices.getState().onFilterChange({
    ...useServices.getState().servicesFilters,
    offset: 0,
    name,
  });
}, 300);

export const ServicesFilters: FC<FilterProps> = ({ ...props }) => {
  const { loading } =
    useDashboard();
  const { servicesFilters: filters, refetchServices, onFilterChange, onCreateService } = useServices();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setSearchField(e.target.value);
  };
  const clear = () => {
    setSearch('');
    onFilterChange({
      ...filters,
      offset: 0,
      name: '',
    });
  };
  return (
    <Grid
      id="users-filters"
      templateColumns={{
        lg: 'repeat(3, 1fr)',
        md: 'repeat(4, 1fr)',
        base: 'repeat(1, 1fr)',
      }}
      position="sticky"
      top={0}
      mx="-6"
      px="6"
      rowGap={4}
      gap={{
        lg: 4,
        base: 0,
      }}
      bg="var(--chakra-colors-chakra-body-bg)"
      py={4}
      zIndex="docked"
      {...props}
    >
      <GridItem colSpan={{ base: 1, md: 2, lg: 1 }} order={{ base: 2, md: 1 }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
          <Input
            placeholder={t('search')}
            value={search}
            borderColor="light-border"
            onChange={onChange}
          />
          <InputRightElement>
            {loading && <Spinner size="xs" />}
            {filters.name && filters.name.length > 0 && (
              <IconButton
                onClick={clear}
                aria-label="clear"
                size="xs"
                variant="ghost"
              >
                <ClearIcon />
              </IconButton>
            )}
          </InputRightElement>
        </InputGroup>
      </GridItem>
      <GridItem colSpan={2} order={{ base: 1, md: 2 }}>
        <HStack justifyContent="flex-end" alignItems="center" h="full">
          <IconButton
            aria-label="refresh services"
            disabled={loading}
            onClick={refetchServices}
            size="sm"
            variant="outline"
          >
            <ReloadIcon
              className={classNames({
                'animate-spin': loading,
              })}
            />
          </IconButton>
          <Button
            colorScheme="primary"
            size="sm"
            onClick={() => onCreateService(true)}
            px={5}
          >
            {t('createService')}
          </Button>
        </HStack>
      </GridItem>
    </Grid>
  );
};
