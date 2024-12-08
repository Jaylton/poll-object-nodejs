const http = require('http');
const Connection = require('./connection');
const { randomUUID } = require('crypto');

const connection = new Connection();

const activeRequests = new Map();

const server =  http.createServer((req, res) => {
    if (req.url === '/start') {
        // Init async query
        try {
            const promise = connection.execute(`SELECT * FROM example`);

            const requestId = randomUUID(); // Unique ID for the request
            activeRequests.set(requestId, { promise, completed: false, result: null });

            // Check if the query was completed
            promise.then(result => {
                const requestInfo = activeRequests.get(requestId);
                if (requestInfo && !requestInfo.completed) {

                    activeRequests.set(requestId, { ...requestInfo, completed: true, result });
                }
            }).catch(error => {
                const requestInfo = activeRequests.get(requestId);
                if (requestInfo) {

                    activeRequests.set(requestId, { ...requestInfo, completed: true, result: 'Error: ' + error.message });
                }
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Query started', requestId }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error: ' + error.message);
        }
    } else if (req.url.startsWith('/check')) {
        const urlParts = req.url.split('/'); // get the request ID from the URL
        const requestId = urlParts[2];

        if (activeRequests.has(requestId)) {
            const requestInfo = activeRequests.get(requestId);
            const { completed, result } = requestInfo;

            if (completed) {
                activeRequests.delete(requestId);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ requestId, status: 'completed', result }));
            } else {

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ requestId, status: 'in progress' }));
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify({error: 'Request ID not found or already completed'}));
        }
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
