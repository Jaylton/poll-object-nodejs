let counter = 0;

class Connection {
    constructor() {
        this.id = counter++;
    }

    // Execução assíncrona com delay simulado
    execute(query) {
        console.log(`Connection ${this.id}: Executing query '${query}'...`);
        return new Promise((resolve) => {
            const delay = Math.random() * 2000 + 3000; // Simular latência
            setTimeout(() => {
                resolve(`Result from connection ${this.id} for query '${query}'`);
            }, delay);
        });
    }
}

module.exports = Connection;
