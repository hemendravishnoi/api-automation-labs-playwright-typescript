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
  console.log('Before All');
});

test.afterEach(() => {
  server.resetHandlers();
  console.log('After each');
});

test.afterAll(() => {
  server.close();
  console.log('After All');
});


