const registry = new Map();

module.exports = {
    register(name, object) {
        registry.set(name, object);
    },
    get(name) {
        return registry.get(name);
    },
};
