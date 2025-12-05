// Frontend export functions
async function downloadTextAsImage() {
    const text = document.getElementById('burushaski-text').value;
    const fontSize = document.getElementById('font-size').value;
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    
    const response = await fetch('/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, fontSize, bgColor, textColor })
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `burushaski_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

async function generateAnimatedGif() {
    const text = document.getElementById('burushaski-text').value;
    const fontSize = document.getElementById('font-size').value;
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    
    const response = await fetch('/generate-gif', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text,
            options: {
                width: 800,
                height: 400,
                fontSize,
                bgColor,
                textColor
            }
        })
    });
    
    const result = await response.json();
    
    if (result.success) {
        // Download the GIF
        window.location.href = result.downloadUrl;
    }
}

async function saveToServer() {
    const text = document.getElementById('burushaski-text').value;
    
    await fetch('/save-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, timestamp: new Date().toISOString() })
    });
    
    alert('Text saved to server!');
}