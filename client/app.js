const { pollOperation } = require('./pollObject/pollOperation');
const proxy = require('./proxy/remoteProxy');

// Exemplo de uso do Poll Object para chamada remota
pollOperation.start(proxy.operation.computeTask, [5, 10]);