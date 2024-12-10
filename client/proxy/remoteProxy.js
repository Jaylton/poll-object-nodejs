const axios = require('axios');

const remoteProxy = {
    operation: {
        async invoke(objectName, method, args) {
            try {
                const response = await axios.post('http://localhost:3000/invoke', {
                    objectName,
                    method,
                    args,
                });
                return response.data.taskId; // Retorna o taskId da operação
            } catch (error) {
                console.error('Error invoking remote method:', error.message);
                throw error;
            }
        },

        async getStatus(taskId) {
            try {
                const response = await axios.get(`http://localhost:3000/status/${taskId}`);
                return response.data; // Retorna o status da operação
            } catch (error) {
                console.error('Error fetching task status:', error.message);
                throw error;
            }
        },
    },
};

module.exports = remoteProxy;
