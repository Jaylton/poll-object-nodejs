const http = require('http');

class PollObject {
    constructor(requestId, interval = 1000) {
        this.requestId = requestId;
        this.interval = interval;
        this.polling = false;
    }

    startPolling() {
        this.polling = true;
        console.log(`Polling started for requestId: ${this.requestId}`);
        this.poll();
    }

    stopPolling() {
        this.polling = false;
        console.log(`Polling stopped for requestId: ${this.requestId}`);
    }

    // Polling method
    poll() {
        if (!this.polling) return;

        http.get(`http://localhost:3000/check/${this.requestId}`, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                const response = JSON.parse(data);

                if (response.status === 'completed') {
                    console.log(`Result for requestId ${this.requestId}:`, response.result);
                    this.stopPolling();
                } else {
                    console.log('Query still in progress...');
                    setTimeout(() => this.poll(), this.interval);
                }
            });
        }).on('error', (err) => {
            console.error('Error in poll:', err.message);
            this.stopPolling();
        });
    }
}

module.exports = PollObject;