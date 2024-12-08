const { performance } = require('perf_hooks');

function monitorPerformance(callback) {
    performance.mark('start');
    callback();
    performance.mark('end');
    performance.measure('Polling duration', 'start', 'end');

    const duration = performance.getEntriesByName('Polling duration')[0].duration;
    console.log(`Polling duration: ${duration}ms`);
}

module.exports = { monitorPerformance };
