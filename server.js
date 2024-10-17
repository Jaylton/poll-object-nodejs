const http = require('http');
const ObjectPool = require('./pool');
const Connection = require('./connection');

// Criar um pool de 5 conexões
const connectionPool = new ObjectPool(() => new Connection(), 5);

const activeRequests = new Map(); // Para rastrear requisições ativas e suas promessas

const server = http.createServer((req, res) => {
    if (req.url === '/start') {
        // Inicia a execução de uma query assíncrona
        try {
            const { connection, promise } = connectionPool.execute(`SELECT * FROM example`);

            const requestId = Date.now(); // Usamos o timestamp como ID único
            activeRequests.set(requestId, { connection, promise, completed: false, result: null });

            // Monitora a promessa e armazena o resultado quando estiver pronto
            promise.then(result => {
                const requestInfo = activeRequests.get(requestId);
                if (requestInfo && !requestInfo.completed) {
                    // Atualiza o map com o resultado final
                    activeRequests.set(requestId, { ...requestInfo, completed: true, result });

                    // Libera a conexão
                    connectionPool.release(connection);
                }
            }).catch(error => {
                const requestInfo = activeRequests.get(requestId);
                if (requestInfo) {
                    // Atualiza o map com o erro final
                    activeRequests.set(requestId, { ...requestInfo, completed: true, result: 'Error: ' + error.message });

                    // Libera a conexão em caso de erro
                    connectionPool.release(connection);
                }
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Query started', requestId }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error: ' + error.message);
        }
    } else if (req.url.startsWith('/check')) {
        // Verifica o estado de uma query com base no ID
        const urlParts = req.url.split('/');
        const requestId = Number(urlParts[2]);

        if (activeRequests.has(requestId)) {
            const requestInfo = activeRequests.get(requestId);
            const { completed, result } = requestInfo;

            if (completed) {
                // Se a query já foi completada, retorna o resultado diretamente
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ requestId, status: 'completed', result }));
            } else {
                // Se a query ainda está em progresso, responde que está em andamento
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ requestId, status: 'in progress' }));
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Request ID not found or already completed');
        }
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
