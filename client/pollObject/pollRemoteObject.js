const axios = require('axios');

class PollRemoteObject {
    constructor(pollInterval, maxAttempts, remoteObject) {
        this.pollInterval = pollInterval; // Intervalo em ms
        this.maxAttempts = maxAttempts; // Máximo de tentativas
        this.attempts = 0; // Contador de tentativas
        this.timer = null; // Referência ao intervalo

        this.remoteObject = remoteObject;
    }

    start() {
        console.log('Starting poll...');
        this.timer = setInterval(async () => {
            this.attempts++;
            await this.remoteObject.fetchResult();
            console.log(`Attempt ${this.attempts}`);

            const isComplete = remoteObject.isComplete;
            console.log(`isComplete: ${isComplete}`);

            if (isComplete || this.attempts >= this.maxAttempts) {
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
const remoteObject = {
    isComplete: false,
    async fetchResult () {
        try {
            const response = await axios.get('http://localhost:3000/remote/operation');
            console.log('Response:', response.data);
            const isComplete = response.data.status === 'completed';
            this.isComplete = isComplete;
            return isComplete;
        } catch (error) {
            console.error('Error during polling:', error.message);
            return false;
        }
    }
};
const pollRemoteObject = new PollRemoteObject(1000, 10, remoteObject);

module.exports = { pollRemoteObject };
