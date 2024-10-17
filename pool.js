class ObjectPool {
    constructor(createFn, size = 10) {
        this.createFn = createFn;
        this.pool = [];
        this.inUse = new Map(); // Map para rastrear objetos em uso e suas promessas

        for (let i = 0; i < size; i++) {
            this.pool.push(this.createFn());
        }
    }

    acquire() {
        if (this.pool.length > 0) {
            const obj = this.pool.pop();
            return obj;
        } else {
            throw new Error("No available objects in the pool");
        }
    }

    release(obj) {
        if (this.inUse.has(obj)) {
            this.inUse.delete(obj); // Remove o objeto do map de "in use"
            this.pool.push(obj); // Devolve o objeto ao pool
        } else {
            throw new Error("Object not from pool");
        }
    }

    execute(query) {
        try {
            const connection = this.acquire();
            const promise = connection.execute(query);
            this.inUse.set(connection, promise);
            return { connection, promise }; // Retorna a conexão e a promessa associada
        } catch (error) {
            throw new Error("Error acquiring object from pool: " + error.message);
        }
    }

    // Verifica se a promessa associada ao objeto já foi resolvida
    checkResult(connection) {
        if (this.inUse.has(connection)) {
            return this.inUse.get(connection); // Retorna a promessa associada
        }
        throw new Error("Object not in use");
    }
}

module.exports = ObjectPool;
