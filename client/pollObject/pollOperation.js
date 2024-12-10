const PollObject = require('./pollObjectBase');

const pollOperation = new PollObject(1000, 10, async (getStatusMethod) => {
    try {
        const response = await getStatusMethod();
        const { status, result } = response;

        if (status === 'completed') {
            console.log('Result:', result);
            return true; // Interrompe o polling
        }

        if (status === 'error') {
            console.error('Error in operation:', result);
            return true; // Interrompe o polling em caso de erro
        }

        return false; // Continua o polling enquanto estiver pendente
    } catch (error) {
        console.error('Error polling:', error.message);
        return false;
    }
});

module.exports = { pollOperation };
