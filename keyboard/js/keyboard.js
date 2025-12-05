// Burushaski Keyboard Layout (Girminas Perso-Arabic)
const burushaskiLayout = [
    // Row 1
    ['\u061b', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669', '\u0660', '-', '=', '\u232b'],
    // Row 2
    ['\u0636', '\u0635', '\u062b', '\u0642', '\u0641', '\u063a', '\u0639', '\u0647', '\u062e', '\u062d', '\u062c', '\u0686', '\u062f', '\\'],
    // Row 3
    ['\u0634', '\u0633', '\u064a', '\u0628', '\u0644', '\u0627', '\u062a', '\u0646', '\u0645', '\u0643', '\u0637', '\u0626', '\u0648', '\u067e'],
    // Row 4
    ['\u0624', '\u0625', '\u0623', '\u0622', '\u0621', '\u0620', '\u060c', '\u06d4', '\u061f', '\u064e', '\u064f', '\u0650', '\u064b', '\u064c'],
    // Row 5
    ['\u064d', '\u0651', '\u0652', '\u0653', '\u0654', '\u0655', '\u0670', '\u200d', '\u200c', '\u2013', '\u2014', '\u2018', '\u2019', '\u201c'],
    // Space row
    ['\u0020', '\u200c', '\u200d', '\u0640']
];

// Special Burushaski characters mapping
const specialChars = {
    // Add Burushaski-specific characters here
    'shift': {
        '\u0636': '\u0637', // Example mappings
        '\u0635': '\u0638'
    },
    'alt': {
        // Alternate characters
    }
};

// Initialize keyboard
function initKeyboard() {
    const keyboard = document.getElementById('keyboard');
    const textarea = document.getElementById('burushaski-text');
    
    burushaskiLayout.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyBtn = document.createElement('button');
            keyBtn.className = 'key';
            keyBtn.textContent = key;
            keyBtn.setAttribute('data-char', key);
            
            keyBtn.addEventListener('click', () => {
                insertText(key);
                updateRenderedText();
            });
            
            rowDiv.appendChild(keyBtn);
        });
        
        keyboard.appendChild(rowDiv);
    });
    
    // Add special keys
    const specialRow = document.createElement('div');
    specialRow.className = 'special-keys';
    
    const spaceKey = document.createElement('button');
    spaceKey.className = 'key space';
    spaceKey.textContent = 'Space';
    spaceKey.addEventListener('click', () => insertText(' '));
    
    const enterKey = document.createElement('button');
    enterKey.className = 'key enter';
    enterKey.textContent = 'Enter';
    enterKey.addEventListener('click', () => insertText('\n'));
    
    const backspaceKey = document.createElement('button');
    backspaceKey.className = 'key backspace';
    backspaceKey.textContent = '⌫';
    backspaceKey.addEventListener('click', () => {
        textarea.value = textarea.value.slice(0, -1);
        updateRenderedText();
    });
    
    specialRow.append(spaceKey, enterKey, backspaceKey);
    keyboard.appendChild(specialRow);
}

function insertText(char) {
    const textarea = document.getElementById('burushaski-text');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    textarea.value = textarea.value.substring(0, start) + 
                     char + 
                     textarea.value.substring(end);
    
    textarea.selectionStart = textarea.selectionEnd = start + char.length;
    textarea.focus();
}

function updateRenderedText() {
    const text = document.getElementById('burushaski-text').value;
    const rendered = document.getElementById('rendered-text');
    
    // Apply RTL styling
    rendered.style.direction = 'rtl';
    rendered.style.textAlign = 'right';
    rendered.innerHTML = text;
}

// Initialize on load
window.addEventListener('DOMContentLoaded', initKeyboard);