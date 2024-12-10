const tasks = new Map();

module.exports = {
    createTask(id, operation) {
        tasks.set(id, { status: 'pending', result: null });
        operation.then((result) => {
            tasks.set(id, { status: 'completed', result });
        }).catch((error) => {
            tasks.set(id, { status: 'error', result: error.message });
        });
    },

    getTaskStatus(id) {
        return tasks.get(id) || { status: 'not_found' };
    },
};
