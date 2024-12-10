const express = require('express');
const dispatcher = require('./middleware/dispatcher');
const lookupService = require('./services/lookupService');

const app = express();
const port = 3000;

app.use(express.json()); // Para requisições JSON

// Rota principal do middleware
app.post('/rpc', dispatcher);

// Serviço de descoberta
app.get('/lookup', (req, res) => {
    const objects = lookupService.getAvailableObjects();
    res.json(objects);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
