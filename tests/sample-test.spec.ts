import { test, expect } from '@playwright/test';
import { SecureApiclient } from '../helpers/secureApiClient.js';

test('GET users', async ({ request }) => {
  const res = await request.get('https://api.github.com/users/hemendravishnoi');
  expect(res.status()).toBe(200);
});

test('Test Sample user form dummy json', async ({ request }) => {
  const api = new SecureApiclient(request);
  const get = await api.sendSecure('get', 'https://dummyjson.com/auth/me', {});
  const body = await get.json();
  expect(body.username).toBe('emilys');
})