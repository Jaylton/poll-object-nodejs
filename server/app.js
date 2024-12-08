const express = require('express');
const logger = require('./middleware/logger');
const remoteRoutes = require('./routes/remote');

const app = express();
const port = 3000;

// Middleware
app.use(logger);

// Rotas
app.use('/remote', remoteRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
