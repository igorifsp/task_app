const userController = require('../../app-task/controllers/userController');

describe('Delete User', () => {
  test('Should delete an existing user', async () => {
    // Simula a requisição com o email do usuário a ser deletado
    const mockReq = {
      params: { email: 'testuser@email.com' } // Email do usuário a ser deletado
    };

    // Simula a resposta da requisição
    const mockRes = {
      status: jest.fn(), // Mock da função status
      send: jest.fn() // Mock da função send
    };

    // Chama o método de deleção do usuário
    await userController.deleteUser(mockReq, mockRes);

    // Verifica se a função status foi chamada com o status 200 (OK)
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Verifica se a função send foi chamada para enviar uma resposta vazia
    expect(mockRes.send).toHaveBeenCalled();
  });

  // Adicione outros casos de teste conforme necessário...
});
