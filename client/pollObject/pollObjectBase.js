class PollObject {
    static sumDurations = 0;
    static numCalls = 0;

    constructor(pollInterval, maxAttempts, operation) {
        PollObject.numCalls += 1;
        this.pollInterval = pollInterval;
        this.maxAttempts = maxAttempts;
        this.operation = operation;
        this.attempts = 0;
        this.timer = null;
        this.isPolling = false;

        this.startTime = 0;
        this.endTime = 0;
    }

    start(method, args) {
        this.startTime = performance.now()
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
            this.endTime = performance.now()
            console.log(`single duration: ${(this.endTime - this.startTime)}ms`);
            PollObject.sumDurations += (this.endTime - this.startTime);
            console.log(`sumDuration: ${PollObject.sumDurations}ms`)
            console.log(`avgDuration: ${PollObject.sumDurations/PollObject.numCalls}ms`)
        }
    }
}

module.exports = PollObject;
