export class BaseApiClient {
  constructor(protected request) {}

  async send(method, url, options = {}) {
    const response = await this.request[method](url, options);

    if (!response.ok()) {
      throw new Error(`API failed: ${response.status()}`);
    }

    return response;
  }
}