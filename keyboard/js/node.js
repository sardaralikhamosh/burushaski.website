// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { createCanvas, loadImage, registerFont } = require('canvas');
const GIFEncoder = require('gifencoder');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Load Burushaski font
registerFont('./fonts/Burushaski-Nastaliq.ttf', { family: 'Burushaski' });

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to generate GIF
app.post('/generate-gif', async (req, res) => {
    try {
        const { text, options } = req.body;
        
        // Generate GIF
        const gifBuffer = await createAnimatedGif(text, options);
        
        // Save to file
        const filename = `burushaski_${Date.now()}.gif`;
        const filepath = path.join(__dirname, 'exports', filename);
        
        fs.writeFileSync(filepath, gifBuffer);
        
        res.json({
            success: true,
            filename: filename,
            downloadUrl: `/download/${filename}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
    const filepath = path.join(__dirname, 'exports', req.params.filename);
    res.download(filepath);
});

// Single frame image
app.post('/generate-image', (req, res) => {
    const { text, fontSize = 40, bgColor = '#ffffff', textColor = '#000000' } = req.body;
    
    const canvas = createCanvas(800, 400);
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Text styling
    ctx.font = `${fontSize}px "Burushaski"`;
    ctx.fillStyle = textColor;
    ctx.direction = 'rtl';
    ctx.textAlign = 'right';
    
    // Text wrapping
    const lines = wrapText(ctx, text, canvas.width - 40);
    
    // Draw text
    lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width - 20, 50 + (index * (fontSize + 10)));
    });
    
    // Convert to PNG buffer
    const buffer = canvas.toBuffer('image/png');
    
    res.set('Content-Type', 'image/png');
    res.send(buffer);
});

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];
    
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    
    lines.push(currentLine);
    return lines;
}

async function createAnimatedGif(text, options) {
    const encoder = new GIFEncoder(options.width || 800, options.height || 400);
    
    // Create output stream
    const stream = encoder.createReadStream();
    const chunks = [];
    
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => {});
    
    // Start encoding
    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(500); // Frame delay in ms
    encoder.setQuality(10); // Image quality
    
    const canvas = createCanvas(encoder.options.width, encoder.options.height);
    const ctx = canvas.getContext('2d');
    
    // Create multiple frames (for animation effect)
    for (let i = 0; i < 5; i++) {
        // Clear canvas
        ctx.fillStyle = options.bgColor || '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw text with different positions or effects
        ctx.font = `${options.fontSize || 40}px "Burushaski"`;
        ctx.fillStyle = options.textColor || '#000000';
        ctx.direction = 'rtl';
        ctx.textAlign = 'right';
        
        // Optional: Add some animation effect
        const offset = Math.sin(i * 0.5) * 5;
        
        const lines = wrapText(ctx, text, canvas.width - 40);
        lines.forEach((line, index) => {
            ctx.fillText(
                line, 
                canvas.width - 20 + offset, 
                50 + (index * ((options.fontSize || 40) + 10))
            );
        });
        
        encoder.addFrame(ctx);
    }
    
    encoder.finish();
    
    return Buffer.concat(chunks);
}

app.listen(PORT, () => {
    console.log(`Burushaski Keyboard Server running on http://localhost:${PORT}`);
});