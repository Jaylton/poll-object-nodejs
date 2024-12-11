const PollObject = require('./pollObjectBase');

const pollOperation = (operation) => new PollObject(1000, 10, operation);

module.exports = { pollOperation };
