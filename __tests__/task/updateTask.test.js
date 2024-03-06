const taskController = require('../../app-task/controllers/taskController');

describe('Update Task', () => {
  test('Should update an existing task', async () => {
    // Simula a requisição com os dados atualizados da tarefa
    const mockReq = {
      params: { idTask: 1 }, // ID da tarefa a ser atualizada
      body: {
        title: 'Updated Task',
        description: 'Updated description of the task',
        isCompleted: true,
        emailUser: 'testuser@email.com'
      }
    };

    // Simula a resposta da requisição
    const mockRes = {
      status: jest.fn(), // Mock da função status
      json: jest.fn() // Mock da função json
    };

    // Chama o método de atualização da tarefa
    await taskController.updateTask(mockReq, mockRes);

    // Verifica se a função status foi chamada com o status 200 (OK)
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Verifica se a função json foi chamada com os dados da tarefa atualizada
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      idTask: 1,
      title: 'Updated Task',
      description: 'Updated description of the task',
      isCompleted: true,
      emailUser: 'testuser@email.com'
    }));
  });

  // Adicione outros casos de teste conforme necessário...
});
