const requestor = require('../requestor');

module.exports = {
    operation: {
        computeTask: (a, b) => requestor.callRemoteMethod('operation', 'computeTask', [a, b]),
    },
};
