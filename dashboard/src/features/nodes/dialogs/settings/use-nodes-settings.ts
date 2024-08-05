import { useState } from "react";
import YAML from "yaml";
import {
  type NodeType,
  NodeBackendSettingConfigFormat,
  useNodesSettingsMutation,
  useNodesSettingsQuery,
} from "../..";

const parseConfig = (data: {
  config: string;
  format: NodeBackendSettingConfigFormat;
}) => {
  return {
    [NodeBackendSettingConfigFormat.PLAIN]: () => data.config,
    [NodeBackendSettingConfigFormat.JSON]: () =>
      JSON.stringify(JSON.parse(data.config), null, "\t"),
    [NodeBackendSettingConfigFormat.YAML]: () =>
      YAML.stringify(YAML.parse(data.config), null, "\t"),
  }[data.format]();
};

export const useNodesSettings = (entity: NodeType, backend: string) => {
  const { data } = useNodesSettingsQuery(entity, backend);
  const [config, setConfig] = useState<string>(data.config);
  const [payloadValidity, setPayloadValidity] = useState<boolean>(true);
  const mutate = useNodesSettingsMutation();
  const language = {
    [NodeBackendSettingConfigFormat.PLAIN]: "text",
    [NodeBackendSettingConfigFormat.JSON]: "json",
    [NodeBackendSettingConfigFormat.YAML]: "yaml",
  }[data.format];

  const handleEditorValidation = (markers: any[]) => {
    setPayloadValidity(!markers.length);
  };

  const handleConfigSave = () => {
    mutate.mutate({ node: entity, backend, config, format: data.format });
  };

  const handleConfigChange = (newConfig: string | undefined) => {
    if (newConfig) {
      try {
        setConfig(parseConfig({ config: newConfig, format: data.format }));
        setPayloadValidity(true);
      } catch (error) {
        setPayloadValidity(false);
      }
    }
  };

  return {
    payloadValidity,
    language,
    config: parseConfig(data),
    handleConfigSave,
    handleConfigChange,
    handleEditorValidation,
  };
};
