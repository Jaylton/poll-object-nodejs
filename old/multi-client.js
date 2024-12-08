const http = require('http');
const PollObject = require('./pool');

// Start query function
function startQuery(index) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/start',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            const response = JSON.parse(data);
            console.log(`Server started query for client ${index}:`, response);

            // Init PollObject
            const pollObject = new PollObject(response.requestId);
            pollObject.startPolling(index);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
}

const numClients = 100;
for(let i = 0; i < numClients; i++) {
    startQuery(i);
}
