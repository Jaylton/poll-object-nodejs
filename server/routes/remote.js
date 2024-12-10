const express = require('express');
const router = express.Router();
const { simulateOperation } = require('../utils/status');

// Simula o estado de uma operação remota
class ApiResponse {
    constructor() {
        this.operationState = {
            status: 'in_progress',
            success: false
        };
    }
}

router.get('/operation', (req, res) => {
    console.log(req);
    response = new ApiResponse()
    operationState = simulateOperation(response.operationState);
    res.json(operationState);
});

module.exports = router;
