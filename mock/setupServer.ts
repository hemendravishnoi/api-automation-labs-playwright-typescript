import { test, expect } from '@playwright/test';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('https://dummyjson.com/api/users', () =>
    HttpResponse.json([
      { id: 1, name: 'MockUser', role: 'Admin' }
    ])
  )
);

test.beforeAll(() => {
  server.listen();
});

test.afterEach(() => {
  server.resetHandlers();
});

test.afterAll(() => {
  server.close();
});


