const invoker = require('../invoker');
const taskManager = require('../services/taskManager');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
    const { objectName, method, args } = req.body;

    try {
        // Gera um ID único para a operação
        const taskId = uuidv4();

        // Cria uma nova tarefa para o método remoto
        const operation = invoker.invoke(objectName, method, args);
        taskManager.createTask(taskId, operation);

        // Retorna imediatamente o ID da tarefa
        res.json({ success: true, taskId });
    } catch (error) {
        console.error('Error invoking method:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};
