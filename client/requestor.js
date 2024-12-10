const axios = require('axios');

module.exports = {
    async callRemoteMethod(objectName, methodName, args) {
        try {
            const response = await axios.post('http://localhost:3000/rpc', {
                objectName,
                method: methodName,
                args,
            });

            if (!response.data.success) {
                throw new Error(response.data.error);
            }

            return response.data.result;
        } catch (error) {
            console.error('Requestor error:', error.message);
            throw error;
        }
    },
};
