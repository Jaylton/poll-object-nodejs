const PollObject = require('./pollObjectBase');

const pollRemoteObject = (remoteObject, taskId) => new PollObject(
    1000, 10, () => remoteObject.fetchResult(taskId)
);

module.exports = { pollRemoteObject };
