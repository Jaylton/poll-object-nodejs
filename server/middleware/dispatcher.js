const invoker = require('../invoker');

module.exports = async (req, res) => {
    const { objectName, method, args } = req.body;

    try {
        const result = await invoker.invoke(objectName, method, args);
        console.log('Result sent to client:', result); // Log para depuração
        res.json({ success: true, result });
    } catch (error) {
        console.error('Error invoking method:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};
