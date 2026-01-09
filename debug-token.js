const fs = require('fs');
const path = require('path');

function debugEnv() {
    console.log('--- Debugging .env ---');
    const envPath = path.join(process.cwd(), '.env');

    if (!fs.existsSync(envPath)) {
        console.log('.env file NOT FOUND');
        // Check for .env.local
        const localEnvPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(localEnvPath)) {
            console.log('.env.local FOUND. Please rename to .env or ensure variables are correct.');
        }
        return;
    }

    const content = fs.readFileSync(envPath, 'utf8');
    console.log(`File size: ${content.length} bytes`);

    const lines = content.split('\n');
    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        const parts = trimmed.split('=');
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();

        console.log(`Line ${index + 1}: Key="${key}", ValueLength=${value.length}, ValueStart="${value.slice(0, 5)}..."`);

        if (key === 'JWT_TOKEN') {
            if (value.length < 100) {
                console.warn('WARNING: JWT_TOKEN seems crucially short for a valid JWT (usually > 100 chars).');
            }
        }
    });
}

debugEnv();
