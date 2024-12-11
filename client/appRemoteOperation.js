const { pollOperation } = require('./pollObject/pollOperation');
const { NUM_CLIENT } = require('./constants');
const proxy = require('./proxy/remoteProxy');

const operation = async (getStatusMethod) => {
    try {
        const response = await getStatusMethod();
        const { status, result } = response;

        if (status === 'completed') {
            return true; // Interrompe o polling
        }

        if (status === 'error') {
            console.error('Error in operation:', result);
            return true; // Interrompe o polling em caso de erro
        }

        return false; // Continua o polling enquanto estiver pendente
    } catch (error) {
        console.error('Error polling:', error.message);
        return false;
    }
}

for (let i = 0; i < NUM_CLIENT; i++) {
    (async () => {
        try {
            // Inicia a operação remota usando o remoteProxy
            const taskId = await proxy.operation.invoke('operation', 'computeTask', [5, 10]);
            console.log('Task ID:', taskId);

            // Inicia o polling com o remoteProxy para verificar o status
            pollOperation(operation).start(() => proxy.operation.getStatus(taskId), []);
        } catch (error) {
            console.error('Error starting operation:', error.message);
        }
    })();
}
