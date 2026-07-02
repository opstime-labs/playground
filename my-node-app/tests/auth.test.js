// tests/auth.test.js
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/db');

// Run this block before any tests execute (Like @BeforeAll in JUnit)
beforeAll((done) => {
  // Clear out the users table so we have a clean test database state
  db.run("DELETE FROM users", [], () => done());
});

// Close database connection after all tests finish (Like @AfterAll in JUnit)
afterAll((done) => {
  db.close(() => done());
});

describe('Authentication Flow (Integration Tests)', () => {
  
  const testUser = {
    email: 'test@example.com',
    password: 'SecurePassword123'
  };

  test('POST /api/auth/register -> should successfully register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId');
    expect(response.body.message).toBe('User created successfully');
  });

  test('POST /api/auth/register -> should fail if email already exists', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email already registered');
  });

  test('POST /api/auth/login -> should log in successfully with correct credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(testUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.email).toBe(testUser.email);
  });

  test('POST /api/auth/login -> should fail with incorrect password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'WrongPassword'
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid email or password');
  });
});
