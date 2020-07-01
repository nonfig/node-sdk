import { ConfigType, IConfiguration } from './interfaces';
import * as xmlParser from 'fast-xml-parser';
import * as yamlParser from 'js-yaml';

export class Configuration implements IConfiguration {
    constructor(instance: Partial<Configuration>) {
        Object.assign(this, instance);
        this.data = this.transformData();
    }

    data: string | unknown;
    description: string;
    fullyQualifiedName: string;
    id: string;
    label: string[];
    name: string;
    path: string;
    type: ConfigType;
    version: number;

    private transformData?(): string | unknown {
        const data = this.data as string;

        if (
            this.type === ConfigType.JSON ||
            this.type === ConfigType.KEYVALUE
        ) {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error(
                    '[Configuration] Syntax error occurred for Configuration'
                );
                return this.data;
            }
        } else if (this.type === ConfigType.YAML) {
            return yamlParser.safeLoad(data);
        } else if (this.type === ConfigType.XML) {
            const isValid = xmlParser.validate(data);

            if (isValid !== true) {
                console.error(
                    '[Configuration] Syntax error occurred for Configuration'
                );
                return this.data;
            }

            return xmlParser.parse(data);
        }
    }
}
