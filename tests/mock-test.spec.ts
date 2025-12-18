import '../mock/setupServer.js';
import { test, expect, request } from '@playwright/test';

test('Mock users API (backend only)', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/api/users');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body[0].name).toBe('MockUser');
});