
import { t } from 'i18next';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { chakra, HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { NodeType, useCoreSettings } from 'stores';
import { FC } from 'react';

const iconProps = {
  baseStyle: {
    w: 4,
    h: 4,
  },
};
const CoreSettingsIcon = chakra(Cog6ToothIcon, iconProps);

type ActionButtonsProps = {
  node: NodeType,
};

export const ActionButtons: FC<ActionButtonsProps> = ({ node }) => {
  return (
    <HStack
      justifyContent="flex-end"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Tooltip
        label={
          t('nodesTable.coreSettings')
        }
        placement="top"
      >
        <IconButton
          p="0 !important"
          aria-label="core settings"
          bg="transparent"
          _dark={{
            _hover: {
              bg: 'gray.700',
            },
          }}
          size={{
            base: 'sm',
            md: 'md',
          }}
          onClick={() => {
            useCoreSettings.setState({ selectedNode: node });
          }}
        >
          <CoreSettingsIcon />
        </IconButton>
      </Tooltip>
    </HStack >
  );
};
