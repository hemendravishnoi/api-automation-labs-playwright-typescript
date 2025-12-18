import { getAccessToken } from "../auth/tokenManager.js";
import { BaseApiClient } from "./baseApiclient.js";

export class SecureApiclient extends BaseApiClient {
    async get(url: string) {
        const token = await getAccessToken(this.request);
        return this.request.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    async post(url: string, data: any) {
        const token = await getAccessToken(this.request);
        return this.request.post(url, {
            data,
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    async sendSecure(method, url, data?) {
        const token = await getAccessToken(this.request);

        //console.log('Token generate and it is '+token);

        return super.send(method, url, {
            data,
            headers: { Authorization: `Bearer ${token}` }
        });
    }

}