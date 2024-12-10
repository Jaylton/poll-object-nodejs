module.exports = {
    async computeTask(a, b) {
        // Simula uma operação demorada
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = a + b; // Soma os dois argumentos
                console.log(`Computed Task: ${result}`); // Log para depuração
                resolve(result);
            }, 1000);
        });
    },
};
