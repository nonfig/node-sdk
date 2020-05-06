import {IOption, IConnection} from './interfaces'
import fetch from "node-fetch";
import Package from '../package.json'

export default class Api {

  private _options: IOption;
  private _connection: IConnection;

  constructor(connection: IConnection, options: IOption) {
    this._connection = connection;
    this._options = options;
  }

  public findByPath(path: string): Promise<object> {
    return this.runFetchRequest(`configurations/path/${path}`);
  }

  private getHeaders() {
    return {
      'User-Agent': `Nonfig/v1 NodeBindings/${Package.version}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this._options.appId}:${this._options.appSecret}`
    }
  }

  private getQualifiedUrl(path): string {
    const {host, port, basePath, apiVersion} = this._connection;

    return `https://${host}:${port}${basePath}${apiVersion}/${path}`;
  }

  private runFetchRequest(path: string): Promise<object> {
    const request = fetch(
      this.getQualifiedUrl(path),
      {
        method: 'GET',
        headers: this.getHeaders()
      }
    );

    return this.handleResponse(request);
  }

  private async handleResponse(request: Promise<any>) {
    const response = await request;
    const body = response.json();

    return [];
  }
}
