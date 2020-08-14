import { Configuration } from '../configuration.entity';

export enum ConfigType {
    JSON = 'JSON',
    YAML = 'YAML',
    XML = 'XML',
    TEXT = 'TEXT',
    KEYVALUE = 'KEYVALUE',
}

export interface IConfiguration {
    id: string;
    fullyQualifiedName: string;
    label: string[];
    version: number;
    name: string;
    path: string;
    description: string;
    type: ConfigType;
    data: string;
    parsed?: any;
    getRawData?(): string;
}

export type NonfigResponse = Configuration[] & Configuration;

export interface IConfigurationResponse {
    success: boolean;
    error: string | null;
    message?: string | null;
    count: number;
    data: Configuration[];
}
