import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const endpoint = searchParams.get('endpoint') || 'ekatalog-archive/paket-e-purchasing';
        const tahun = searchParams.get('tahun') || '2025';
        const limit = searchParams.get('limit');
        const kode_klpd = searchParams.get('kode_klpd');
        const offset = searchParams.get('offset');
        const validLimit = limit || '5';
        const validKodeKlpd = kode_klpd || 'K34';
        const validTahun = tahun || new Date().getFullYear().toString();
        // Pagination support

        const token = process.env.JWT_TOKEN;

        if (!token) {
            return NextResponse.json({ error: 'JWT_TOKEN is not defined in environment variables' }, { status: 500 });
        }

        let apiPath = endpoint;
        // If the endpoint doesn't start with 'api/', assume it's a v1 endpoint for backward compatibility
        // unless it's explicitly one of the new paths which are passed with 'api/' prefix.
        // Actually, the user input might or might not have it. 
        // Let's normalize: if it starts with '/', remove it.
        if (apiPath.startsWith('/')) {
            apiPath = apiPath.substring(1);
        }

        if (!apiPath.startsWith('api/')) {
            apiPath = `api/v1/${apiPath}`;
        }

        const baseUrl = `https://data.inaproc.id/${apiPath}`;
        const hasQuery = baseUrl.includes('?');
        const separator = hasQuery ? '&' : '?';

        // Ensure limit, kode_klpd, and tahun are appended properly.
        // We use URLSearchParams to construct the query string safely if we were building from scratch,
        // but since we are appending to a potentially existing path, string concatenation with checks is practical.

        let apiUrl = `${baseUrl}${separator}limit=${validLimit}&kode_klpd=${validKodeKlpd}&tahun=${validTahun}`;

        if (offset) {
            apiUrl += `&offset=${offset}`;
        }

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
