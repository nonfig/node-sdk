import {IOption, IConnection} from './interfaces';
import fetch from "node-fetch";
import Package from '../package.json';
import {IConfigurationResponse} from "./interfaces/IConfiguration";

export default class Api {

  private _options: IOption;
  private readonly _connection: IConnection;

  constructor(connection: IConnection, options: IOption) {
    this._connection = connection;
    this._options = options;
  }

  public findByPath(path: string): Promise<IConfigurationResponse> {
    return this.runFetchRequest(`configurations/path/${path}`);
  }

  public findByName(name: string): Promise<IConfigurationResponse> {
    return this.runFetchRequest(`configurations/name/${name}`);
  }

  public findById(id: string): Promise<IConfigurationResponse> {
    return this.runFetchRequest(`configurations/id/${id}`);
  }

  public findByLabels(labels: string[]): Promise<IConfigurationResponse> {
    return this.runFetchRequest(`configurations/labels/${labels.join(",")}`);
  }

  private getHeaders() {
    return {
      'User-Agent': `Nonfig/v1 NodeBindings/${Package.version}`,
      'Content-Type': 'application/json',
      "Accept": 'application/json',
      "Authorization": `Bearer ${this._options.appId}:${this._options.appSecret}`
    };
  }

  private getQualifiedUrl(path): string {
    const {host, port, basePath, apiVersion} = this._connection;

    return `https://${host}:${port}${basePath}${apiVersion}/${path}`;
  }

  private runFetchRequest(path: string): Promise<IConfigurationResponse> {
    const request = fetch(
      this.getQualifiedUrl(path),
      {
        method: 'GET',
        headers: this.getHeaders()
      }
    );

    return Api.handleResponse(request);
  }

  private static async handleResponse(request: Promise<any>) {
    const response = await request;
    return response.json();
  }
}
