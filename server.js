const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Serve keyboard app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'keyboard', 'index.html'));
});

// API endpoint for image generation (placeholder)
app.post('/api/generate-image', (req, res) => {
    const { text, options } = req.body;
    
    // Return a mock response for now
    res.json({
        success: true,
        message: 'Image generation endpoint',
        text: text,
        options: options,
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Burushaski Keyboard running at:`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`📍 Network: http://${getIPAddress()}:${PORT}`);
});

// Function to get local IP address
function getIPAddress() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return 'localhost';
}