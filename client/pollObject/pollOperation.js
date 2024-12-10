const PollObject = require('./pollObjectBase');

const pollOperation = new PollObject(1000, 10, async (method, args) => {
    try {
        const result = await method(...args);
        console.log('Result:', result);
        return result !== undefined && result !== null; // Considere válidos resultados não nulos/indefinidos
    } catch (error) {
        console.error('Error polling:', error.message);
        return false;
    }
});

pollOperation.start = function (method, args) {
    if (this.timer) {
        console.log('Polling already in progress.');
        return;
    }

    console.log('Starting Poll Object...');
    this.timer = setInterval(async () => {
        this.attempts++;
        console.log(`Attempt ${this.attempts}`);
        const result = await this.operation(method, args);
        if (result || this.attempts >= this.maxAttempts) {
            this.stop();
        }
    }, this.pollInterval);
};

module.exports = { pollOperation };
