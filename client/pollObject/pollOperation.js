const PollObject = require('./pollObjectBase');

const pollOperation = new PollObject(1000, 10, operation);

module.exports = { pollOperation };
