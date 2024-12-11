module.exports = {
    async computeTask(a, b) {
        // Simula uma operação demorada
        return new Promise((resolve) => {
            const result = a + b; // Soma os dois argumentos
            resolve(result);
        });
    },
};
