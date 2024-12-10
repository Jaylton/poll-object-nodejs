class PollObject {
    constructor(pollInterval, maxAttempts, operation) {
        this.pollInterval = pollInterval;
        this.maxAttempts = maxAttempts;
        this.operation = operation;
        this.attempts = 0;
        this.timer = null;
        this.isPolling = false;
    }

    start(method, args) {
        if (this.timer) {
            console.log('Polling already in progress.');
            return;
        }

        console.log('Starting Poll Object...');
        this.isPolling = true; // Define o estado de polling ativo
        this.timer = setInterval(async () => {
            this.attempts++;
            console.log(`Attempt ${this.attempts}`);
            const result = await this.operation(method, args);
            if (result && this.isPolling) {
                console.log('Polling successful. Result:', result);
                this.stop();
            } else if (this.attempts >= this.maxAttempts) {
                console.log('Max attempts reached.');
                this.stop();
            }
        }, this.pollInterval);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.isPolling = false; // Atualiza o estado de polling para inativo
            console.log('Polling stopped.');
        }
    }
}

module.exports = PollObject;
