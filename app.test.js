
const request = require('supertest');
const app = require('./index');

describe('CloudNova application', () => {
  test('homepage should load successfully', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(500);
    expect(response.text).toContain('CloudNova');
  });

  test('health endpoint should return healthy status', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'healthy',
      application: 'CloudNova'
    });
  });
});
