require('dotenv').config();

// Menggunakan Fetch API (Native)
async function getRUPData() {
    const JWT_TOKEN = process.env.JWT_TOKEN;
    const BASE_URL = 'https://data.inaproc.id/api';

    try {
        const response = await fetch(`${BASE_URL}/v1/ekatalog-archive/paket-e-purchasing?limit=5&kode_klpd=K34&tahun=2025`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${JWT_TOKEN}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error! Status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Data RUP:', data);

        // --- Export to Excel ---
        const rows = data.data || [];
        if (rows.length > 0) {
            const XLSX = require('xlsx');
            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "RUP Data");

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `hasil_rup_${timestamp}.xlsx`;

            XLSX.writeFile(workbook, filename);
            console.log(`\nSuccess! Data exported to: ${filename}`);
        } else {
            console.log('\nNo data to export.');
        }

        return data;

    } catch (error) {
        console.error('Error Message:', error.message);
        console.error('Error Code:', error.code || 'No code');
        if (error.cause) console.error('Cause:', error.cause);
    }
}

// Jalankan fungsi
getRUPData();