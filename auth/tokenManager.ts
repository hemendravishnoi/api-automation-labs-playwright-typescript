import type { APIRequestContext } from '@playwright/test'


type TokenCache = {
    token: string;
    expiry: number;
};

let cache: TokenCache | null = null;
let refreshinProgress: Promise<string> | null = null;

export async function getAccessToken(request: APIRequestContext): Promise<string> {
    if (cache && Date.now() < cache.expiry) {
        return cache.token;
    }
    if (refreshinProgress) {
        return refreshinProgress;
    }

    refreshinProgress = refreshToken(request);
    const token = await refreshinProgress;
    refreshinProgress = null;

    return token;
}

async function refreshToken(request: APIRequestContext): Promise<string> {
    const response = await request.post('https://dummyjson.com/auth/login', {
        data: {
            //grant_type: 'client_credentials',
            username: 'emilys',//ProcessingInstruction.env.CLIENT_ID,
            password: 'emilyspass', //ProcessingInstruction.env.CLIENT_SECRET,
            expiresInMins: 30
        },
        headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok()) {
        throw new Error('Failed to fetch token');
    }

    const body = await response.json();
    //console.log('Body is '+ body);

    cache = {
        token: body.accessToken,
        expiry: Date.now() + 29 * 60 * 1000
    };
    //console.log('Token is '+ cache.token);

    //console.log('Token body is '+ body.accessToken);
    return cache.token;
}