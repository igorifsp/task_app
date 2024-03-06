const taskController = require('../../app-task/controllers/taskController');

describe('Delete Task', () => {
  test('Should delete an existing task', async () => {
    // Simula a requisição com o ID da tarefa a ser deletada
    const mockReq = {
      params: { idTask: 1 } // ID da tarefa a ser deletada
    };

    // Simula a resposta da requisição
    const mockRes = {
      status: jest.fn(), // Mock da função status
      send: jest.fn() // Mock da função send
    };

    // Chama o método de deleção da tarefa
    await taskController.deleteTask(mockReq, mockRes);

    // Verifica se a função status foi chamada com o status 204 (No Content)
    expect(mockRes.status).toHaveBeenCalledWith(204);

    // Verifica se a função send foi chamada para enviar uma resposta vazia
    expect(mockRes.send).toHaveBeenCalled();
  });

  // Adicione outros casos de teste conforme necessário...
});
