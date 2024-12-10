const express = require('express');
const dispatcher = require('./middleware/dispatcher');
const operation = require('./objects/operation');
const lookup = require('./services/lookupService');

const app = express();
app.use(express.json());

// Registra os objetos remotos
lookup.register('operation', operation);

// Rota para invocar operações
app.post('/invoke', dispatcher);

// Rota para consultar status das operações
const taskManager = require('./services/taskManager');
app.get('/status/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    res.json(taskManager.getTaskStatus(taskId));
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
