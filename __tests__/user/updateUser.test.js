const userController = require('../../app-task/controllers/userController');

describe('Update User', () => {
  test('Should update an existing user', async () => {
    // Simula a requisição com os dados atualizados do usuário
    const mockReq = {
      params: { email: 'testuser@email.com' }, // Email do usuário a ser atualizado
      body: { username: 'Updated User' } // Novo nome de usuário
    };

    // Simula a resposta da requisição
    const mockRes = {
      status: jest.fn(), // Mock da função status
      json: jest.fn() // Mock da função json
    };

    // Chama o método de atualização do usuário
    await userController.updateUser(mockReq, mockRes);

    // Verifica se a função status foi chamada com o status 200 (OK)
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Verifica se a função json foi chamada com os dados do usuário atualizado
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      email: 'testuser@email.com', // O email do usuário não deve ser alterado
      username: 'Updated User' // O nome de usuário deve ser atualizado para 'Updated User'
    }));
  });

  // Adicione outros casos de teste conforme necessário...
});
