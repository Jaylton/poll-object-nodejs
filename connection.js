let counter = 0;

class Connection {
    constructor() {
        this.id = counter++;
    }

    // Execute a query with a random delay
    execute(query) {
        console.log(`Connection ${this.id}: Executing query '${query}'...`);
        return new Promise((resolve) => {
            const delay = Math.random() * 2000 + 2000; // random delay between 2 and 4 seconds
            setTimeout(() => {
                resolve(`Result from connection ${this.id} for query '${query}'`);
            }, delay);
        });
    }
}

module.exports = Connection;
