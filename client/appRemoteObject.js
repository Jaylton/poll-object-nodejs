const { pollRemoteObject } = require('./pollObject/pollRemoteObject');
const proxy = require('./proxy/remoteProxy');

class RemoteObject {
    constructor() {
        this.isComplete = false;
    }
    async fetchResult(taskId) {
        try {
            const { status, result } = await proxy.operation.getStatus(taskId);
            this.isComplete = status == 'completed';

            if (this.isComplete) {
                console.log('Result:', result);
            }

            return this.isComplete;
        } catch (error) {
            console.error('Error during polling:', error.message);
            return false;
        }
    }
};

for (let i = 0; i < NUM_CLIENT; i++) {
    (async () => {
        remoteObject = new RemoteObject();
        try {
            // Inicia a operação remota usando o remoteProxy
            const taskId = await proxy.operation.invoke('operation', 'computeTask', [5, 10]);
            console.log('Task ID:', taskId);

            // Inicia o polling com o remoteProxy para verificar o status
            pollRemoteObject(remoteObject, taskId).start();
        } catch (error) {
            console.error('Error starting operation:', error.message);
        }
    })();
}
