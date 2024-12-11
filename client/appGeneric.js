const { pollGeneric } = require('./pollObject/pollGeneric');
const { NUM_CLIENT } = require('./constants');
const proxy = require('./proxy/remoteProxy');

for (let i = 0; i < NUM_CLIENT; i++) {
    (async () => {
        try {
            // Inicia a operação remota usando o remoteProxy
            const taskId = await proxy.operation.invoke('operation', 'computeTask', [5, 10]);
            console.log('Task ID:', taskId);

            // Inicia o polling com o remoteProxy para verificar o status
            pollGeneric().start(() => proxy.operation.getStatus(taskId), []);
        } catch (error) {
            console.error('Error starting operation:', error.message);
        }
    })();
}
