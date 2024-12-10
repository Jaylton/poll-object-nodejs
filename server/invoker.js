const fs = require('fs');
const path = require('path');

// Carregar objetos disponíveis
const objects = {};
const objectsPath = path.join(__dirname, './objects');

fs.readdirSync(objectsPath).forEach((file) => {
    const objectName = path.basename(file, '.js'); // Nome do objeto sem extensão
    objects[objectName] = require(path.join(objectsPath, file)); // Importa o módulo
});

module.exports = {
    invoke(objectName, methodName, args) {
        if (!objects[objectName]) {
            throw new Error(`Object ${objectName} not found`);
        }

        const object = objects[objectName];
        if (typeof object[methodName] !== 'function') {
            throw new Error(`Method ${methodName} not found on ${objectName}`);
        }

        return object[methodName](...args);
    },
};
