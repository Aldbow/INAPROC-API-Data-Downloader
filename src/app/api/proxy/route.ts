import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const endpoint = searchParams.get('endpoint') || 'ekatalog-archive/paket-e-purchasing';
        const tahun = searchParams.get('tahun') || '2025';
        const limit = searchParams.get('limit') || '5';
        const kode_klpd = searchParams.get('kode_klpd') || 'K34'; // Default to K34 as per original script

        const token = process.env.JWT_TOKEN;

        if (!token) {
            return NextResponse.json({ error: 'JWT_TOKEN is not defined in environment variables' }, { status: 500 });
        }

        const apiUrl = `https://data.inaproc.id/api/v1/${endpoint}?limit=${limit}&kode_klpd=${kode_klpd}&tahun=${tahun}`;

        console.log(`Fetching from: ${apiUrl}`);

        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'PostmanRuntime/7.26.8'
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Upstream API failed with status: ${response.status}`);
            console.error(`Error details: ${errorText}`);
            return NextResponse.json({ error: `API Error: ${response.status}`, details: errorText }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error: unknown) {
        console.error('Proxy Error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: 'Internal Server Error', details: message }, { status: 500 });
    }
}
