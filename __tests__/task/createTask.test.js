const taskController = require('../../app-task/controllers/taskController');

describe('Create Task', () => {
  test('Should create a new task', async () => {
    // Simula a requisição com os dados da nova tarefa
    const mockReq = {
      body: {
        title: 'New Task',
        description: 'Description of the new task',
        isCompleted: false,
        emailUser: 'testuser@email.com'
      }
    };

    // Simula a resposta da requisição
    const mockRes = {
      status: jest.fn(), // Mock da função status
      json: jest.fn() // Mock da função json
    };

    // Chama o método de criação da tarefa
    await taskController.createTask(mockReq, mockRes);

    // Verifica se a função status foi chamada com o status 201 (Created)
    expect(mockRes.status).toHaveBeenCalledWith(201);

    // Verifica se a função json foi chamada com os dados da nova tarefa
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Task',
      description: 'Description of the new task',
      isCompleted: false,
      emailUser: 'testuser@email.com'
    }));
  });

  // Adicione outros casos de teste conforme necessário...
});
