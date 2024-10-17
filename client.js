const http = require('http');
const PollObject = require('./pool');

// Start query function
function startQuery() {
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
            console.log('Server started query:', response);

            // Init PollObject
            const pollObject = new PollObject(response.requestId);
            pollObject.startPolling();
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
}

startQuery();
