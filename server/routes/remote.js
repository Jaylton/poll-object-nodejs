const express = require('express');
const router = express.Router();
const { simulateOperation } = require('../utils/status');

// Simula o estado de uma operação remota
let operationState = { status: 'in_progress', success: false };

router.get('/operation', (req, res) => {
    operationState = simulateOperation(operationState);
    res.json(operationState);
});

module.exports = router;
