class Connection {
    static counter = 0;
    constructor() {
    }

    // Execute a query with a random delay
    execute(query) {
        Connection.counter++;
        console.log(`Connection ${Connection.counter}: Executing query '${query}'...`);
        return new Promise((resolve) => {
            const delay = Math.random() * 2000 + 2000; // random delay between 2 and 4 seconds
            setTimeout(() => {
                resolve(`Result from connection for query '${query}'`);
            }, delay);
        });
    }
}

module.exports = Connection;
