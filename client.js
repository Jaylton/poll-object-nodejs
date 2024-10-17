const http = require('http');

// Função para iniciar a query no servidor
function startQuery() {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/start',
        method: 'GET'
    };

    const req = http.request(options, res => {
        let data = '';
        res.on('data', chunk => {
            data = chunk;
        });

        res.on('end', () => {
            try {
                if (res.headers['content-type'] === 'application/json') {
                    const { requestId } = JSON.parse(data);
                    console.log(`Query started with requestId: ${requestId}`);
                    checkQueryStatus(requestId); // Inicia o processo de verificação periódica
                } else {
                    console.error('Unexpected response:', data);
                }
            } catch (err) {
                console.error('Error parsing JSON:', err);
            }
        });
    });

    req.on('error', error => {
        console.error('Error starting query:', error);
    });

    req.end();
}

// Função para verificar o status da query periodicamente
function checkQueryStatus(requestId) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/check/${requestId}`,
        method: 'GET'
    };

    const req = http.request(options, res => {
        let data = '';
        res.on('data', chunk => {
            data = chunk;
        });

        res.on('end', () => {
            try {
                if (res.headers['content-type'] === 'application/json') {
                    const response = JSON.parse(data);
                    if (response.status === 'completed') {
                        console.log(`Query completed with result: ${response.result}`);
                    } else {
                        console.log('Query still in progress...');

                        setTimeout(() => {
                            checkQueryStatus(requestId); // Verifica novamente após 1 segundo
                        }, 1000);
                    }
                } else {
                    console.error('Unexpected response:', data);
                }
            } catch (err) {
                console.error('Error parsing JSON:', err);
            }
        });
    });

    req.on('error', error => {
        console.error('Error checking query status:', error);
    });

    req.end();
}

// Inicia o processo
startQuery();
