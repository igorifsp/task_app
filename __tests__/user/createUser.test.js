const userController = require('../../app-task/controllers/userController');

describe('Create User', () => {
  test('Should create a new user with random email', async () => {
    const mockReq = {
      body: {
        email: `testuser${Math.floor(Math.random() * 10000)}@email.com`,
        password: 'test123',
        username: 'Test User'
      }
    };

    const mockRes = {
      status: jest.fn(), // Mock da função status
      json: jest.fn() // Mock da função json
    };

    await userController.createUser(mockReq, mockRes);

    // Verifica se o status 201 (Created) é retornado
    expect(mockRes.status).toHaveBeenCalledWith(201);

    // Verifica se o usuário foi criado corretamente
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      email: expect.any(String),
      password: 'test123',
      username: 'Test User'
    }));
  });
});
