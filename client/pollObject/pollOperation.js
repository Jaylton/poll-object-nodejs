const PollObject = require('./pollObjectBase');
const { POLL_INTERVAL } = require('../constants');

const pollOperation = (operation) => new PollObject(POLL_INTERVAL, 50, operation);

module.exports = { pollOperation };
