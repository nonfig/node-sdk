export interface IConfiguration {
    id: string;
    fullyQualifiedName: string;
    label: string[];
    version: number;
    name: string;
    path: string;
    description: string;
    type: string;
    data: string;
}

export interface IConfigurationResponse {
    success: boolean;
    error: string | null;
    count: number;
    data: IConfiguration[];
}