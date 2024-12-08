const axios = require('axios');

class PollObject {
    constructor(pollInterval, maxAttempts, operation) {
        this.pollInterval = pollInterval; // Intervalo em ms
        this.maxAttempts = maxAttempts; // Máximo de tentativas
        this.operation = operation; // Operação a ser executada periodicamente
        this.attempts = 0; // Contador de tentativas
        this.timer = null; // Referência ao intervalo
    }

    start() {
        console.log('Starting poll...');
        this.timer = setInterval(async () => {
            this.attempts++;
            console.log(`Attempt ${this.attempts}`);

            const result = await this.operation();

            if (result || this.attempts >= this.maxAttempts) {
                this.stop(); // Para o polling quando bem-sucedido ou atinge o máximo
            }
        }, this.pollInterval);
    }

    stop() {
        clearInterval(this.timer);
        console.log('Polling stopped.');
    }
}

// Poll Operation específico para a operação remota
const pollOperation = new PollObject(1000, 10, async () => {
    try {
        const response = await axios.get('http://localhost:3000/remote/operation');
        console.log('Response:', response.data);
        return response.data.status === 'completed';
    } catch (error) {
        console.error('Error during polling:', error.message);
        return false;
    }
});

module.exports = { pollOperation };
