module.exports = {
    async computeTask(a, b) {
        // Simula uma operação demorada
        return new Promise((resolve) => {
            const delay = Math.floor(Math.random() * 2000) + 2000; // Gera um delay aleatório entre 2 e 4 segundos
            setTimeout(() => {
                const result = a + b; // Soma os dois argumentos
                resolve(result);
            }, delay);
        });
    },
};
