// Simula a evolução do estado de uma operação remota
function simulateOperation(currentState) {
    if (currentState.status === 'completed') {
        return currentState;
    }

    // Atualiza aleatoriamente para "completed" ou mantém "in_progress"
    const success = Math.random() > 0.7;
    if (success) {
        return { status: 'completed', success: true };
    }

    return { status: 'in_progress', success: false };
}

module.exports = { simulateOperation };
