// Simula a evolução do estado de uma operação remota
function simulateOperation(currentState) {
    if (currentState.status === 'completed') {
        return currentState;
    }

    // Atualiza aleatoriamente para "completed" ou mantém "in_progress"
    const randomValue = Math.random();
    const success = randomValue > 0.7;
    console.log(`random: ${randomValue}`);
    if (success) {
        return { status: 'completed', success: true };
    }

    return { status: 'in_progress', success: false };
}

module.exports = { simulateOperation };
