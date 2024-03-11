import {
    Badge,
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    ModalBody,
    ModalFooter,
    Text,
    useToast,
} from '@chakra-ui/react';
import classNames from 'classnames';
import { useCoreSettings } from 'stores';
import debounce from 'lodash.debounce';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import { JsonEditor } from 'components/json-editor';
import 'components/json-editor/themes.js';
import { ExitFullScreenIcon, FullScreenIcon, ReloadIcon } from './icon';
import { getStatus, getWebsocketUrl } from './helper';
import { MAX_NUMBER_OF_LOGS } from '.';

let logsTmp: string[] = [];

export const CoreSettingModalContent: FC = () => {
    const {
        fetchCoreSettings,
        updateConfig,
        isLoading,
        config,
        isPostLoading,
        restartCore,
        selectedNode,
    } = useCoreSettings();
    const logsDiv = useRef<HTMLDivElement | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const { t } = useTranslation();
    const toast = useToast();
    const form = useForm({
        defaultValues: { config: config || {} },
    });

    useEffect(() => {
        if (config) form.setValue('config', config);
    }, [config]);

    useEffect(() => {
        if (selectedNode) fetchCoreSettings();
    }, [selectedNode]);
    ''.startsWith;
    const scrollShouldStayOnEnd = useRef(true);
    const updateLogs = useCallback(
        debounce((logs: string[]) => {
            const isScrollOnEnd =
                Math.abs(
                    (logsDiv.current?.scrollTop || 0) -
                    (logsDiv.current?.scrollHeight || 0) +
                    (logsDiv.current?.offsetHeight || 0)
                ) < 10;
            if (logsDiv.current && isScrollOnEnd)
                scrollShouldStayOnEnd.current = true;
            else scrollShouldStayOnEnd.current = false;
            if (logs.length < 40) setLogs(logs);
        }, 300),
        []
    );

    const { readyState } = useWebSocket(selectedNode?.id ? getWebsocketUrl(selectedNode.id) : '', {
        onMessage: (e: any) => {
            logsTmp.push(e.data);
            if (logsTmp.length > MAX_NUMBER_OF_LOGS)
                logsTmp = logsTmp.splice(0, logsTmp.length - MAX_NUMBER_OF_LOGS);
            updateLogs([...logsTmp]);
        },
        shouldReconnect: () => true,
        reconnectAttempts: 10,
        reconnectInterval: 1000,
    });

    useEffect(() => {
        if (logsDiv.current && scrollShouldStayOnEnd.current)
            logsDiv.current.scrollTop = logsDiv.current?.scrollHeight;
    }, [logs]);

    useEffect(() => {
        return () => {
            logsTmp = [];
        };
    }, []);

    const status = getStatus(readyState.toString());

    const {
        mutate: handleRestartCore,
        isPending: isRestarting
    } = useMutation({ mutationFn: restartCore });

    const handleOnSave = ({ config }: any) => {
        updateConfig(config)
            .then(() => {
                toast({
                    title: t('core.successMessage'),
                    status: 'success',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });
            })
            .catch((e) => {
                let message = t('core.generalErrorMessage');
                if (typeof e.response._data.detail === 'object')
                    message =
                        e.response._data.detail[Object.keys(e.response._data.detail)[0]];
                if (typeof e.response._data.detail === 'string')
                    message = e.response._data.detail;

                toast({
                    title: message,
                    status: 'error',
                    isClosable: true,
                    position: 'top',
                    duration: 3000,
                });
            });
    };

    const editorRef = useRef<HTMLDivElement>(null);
    const [isFullScreen, setFullScreen] = useState(false);
    const handleFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setFullScreen(false);
        } else {
            editorRef.current?.requestFullscreen();
            setFullScreen(true);
        }
    };
    return (
        <form onSubmit={form.handleSubmit(handleOnSave)}>
            <ModalBody>
                <FormControl>
                    <HStack justifyContent="space-between" alignItems="flex-start">
                        <FormLabel>
                            {t('core.configuration')}{' '}
                            {isLoading && <CircularProgress isIndeterminate size="15px" />}
                        </FormLabel>
                    </HStack>
                    <Box position="relative" ref={editorRef} minHeight="300px">
                        <Controller
                            control={form.control}
                            name="config"
                            render={({ field }) => (
                                <JsonEditor json={config} onChange={field.onChange} />
                            )}
                        />
                        <IconButton
                            size="xs"
                            aria-label="full screen"
                            variant="ghost"
                            position="absolute"
                            top="2"
                            right="4"
                            onClick={handleFullScreen}
                        >
                            {!isFullScreen ? <FullScreenIcon /> : <ExitFullScreenIcon />}
                        </IconButton>
                    </Box>
                </FormControl>
                <FormControl mt="4">
                    <HStack justifyContent="space-between">
                        <FormLabel>{t('core.logs')}</FormLabel>
                        <Text as={FormLabel}>{t(`core.socket.${status}`)}</Text>
                    </HStack>
                    <Box
                        border="1px solid"
                        borderColor="gray.300"
                        bg="#F9F9F9"
                        _dark={{
                            borderColor: 'gray.500',
                            bg: '#2e3440',
                        }}
                        borderRadius={5}
                        minHeight="200px"
                        maxHeight={'250px'}
                        p={2}
                        overflowY="auto"
                        ref={logsDiv}
                    >
                        {logs.map((message, i) => (
                            <Text fontSize="xs" opacity={0.8} key={i} whiteSpace="pre-line">
                                {message}
                            </Text>
                        ))}
                    </Box>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <HStack w="full" justifyContent="space-between">
                    <Box>
                        <Button
                            size="sm"
                            leftIcon={
                                <ReloadIcon
                                    className={classNames({
                                        'animate-spin': isRestarting,
                                    })}
                                />
                            }
                            onClick={() => handleRestartCore()}
                        >
                            {t(isRestarting ? 'core.restarting' : 'core.restartCore')}
                        </Button>
                    </Box>
                    <HStack>
                        <Button
                            size="sm"
                            variant="solid"
                            colorScheme="primary"
                            px="5"
                            type="submit"
                            isDisabled={isLoading || isPostLoading}
                            isLoading={isPostLoading}
                        >
                            {t('core.save')}
                        </Button>
                    </HStack>
                </HStack>
            </ModalFooter>
        </form>
    );
};
