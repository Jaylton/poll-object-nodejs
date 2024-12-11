const PollObject = require('./pollObjectBase');
const { POLL_INTERVAL } = require('../constants');

const pollRemoteObject = (remoteObject, taskId) => new PollObject(
    POLL_INTERVAL, 50, () => remoteObject.fetchResult(taskId)
);

module.exports = { pollRemoteObject };
