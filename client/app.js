const { pollOperation } = require('./pollObject/pollOperation');
const proxy = require('./proxy/remoteProxy');

(async () => {
    try {
        // Inicia a operação remota usando o remoteProxy
        const taskId = await proxy.operation.invoke('operation', 'computeTask', [5, 10]);
        console.log('Task ID:', taskId);

        // Inicia o polling com o remoteProxy para verificar o status
        pollOperation.start(() => proxy.operation.getStatus(taskId), []);
    } catch (error) {
        console.error('Error starting operation:', error.message);
    }
})();
