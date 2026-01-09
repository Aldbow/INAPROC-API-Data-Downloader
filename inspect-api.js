const fs = require('fs');
const path = require('path');

// Read .env manualy to get token
const envPath = path.join(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const tokenMatch = envContent.match(/JWT_TOKEN=(.+)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';

async function fetchAndInspect() {
    // Using an endpoint known to work from previous logs
    const url = 'https://data.inaproc.id/api/legacy/ekatalog/paket-e-purchasing?limit=2&kode_klpd=K34&tahun=2025';

    console.log(`Fetching: ${url}`);

    try {
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.26.8'
            }
        });

        if (!res.ok) {
            console.error(`Status: ${res.status}`);
            console.error(await res.text());
            return;
        }

        const data = await res.json();
        console.log('--- RESPONSE STRUCTURE ---');
        console.log('Top level keys:', Object.keys(data));

        if (Array.isArray(data)) {
            console.log('Data is an Array with length:', data.length);
            if (data.length > 0) {
                console.log('Sample Data Key/Value pairs:');
                const sample = data[0];
                for (const [key, val] of Object.entries(sample)) {
                    // Check for masked data (asterisks)
                    if (typeof val === 'string' && val.includes('**')) {
                        console.log(`[MASKED] ${key}: ${val}`);
                    } else {
                        // Print a few non-masked ones just to see
                        if (Math.random() < 0.2) console.log(`${key}: ${val}`);
                    }
                }
            }
        } else {
            console.log('Data is Object');
            // Check for pagination keys
            const keys = Object.keys(data);
            const paginationKeys = keys.filter(k =>
                ['page', 'limit', 'total', 'count', 'next', 'previous', 'meta', 'links'].some(pk => k.toLowerCase().includes(pk))
            );
            console.log('Possible pagination keys:', paginationKeys);

            if (data.data && Array.isArray(data.data)) {
                console.log('Found "data" array inside object. Length:', data.data.length);
                // Check masked in data
                if (data.data.length > 0) {
                    const sample = data.data[0];
                    for (const [key, val] of Object.entries(sample)) {
                        if (typeof val === 'string' && val.includes('**')) {
                            console.log(`[MASKED] ${key}: ${val}`);
                        }
                    }
                }
            }
        }

    } catch (e) {
        console.error(e);
    }
}

fetchAndInspect();
