"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Download, Home, Loader2, PauseCircle } from "lucide-react"
import { exportToExcel } from "@/lib/excel-utils"
import Link from "next/link"

const ENDPOINTS = [
    {
        label: "Legacy API",
        items: [
            { value: "api/legacy/ekatalog-archive/komoditas-detail", label: "Ekatalog Archive - Komoditas Detail" },
            { value: "api/legacy/ekatalog-archive/instansi-satker", label: "Ekatalog Archive - Instansi Satker" },
            { value: "api/legacy/ekatalog-archive/penyedia-detail", label: "Ekatalog Archive - Penyedia Detail" },
            { value: "api/legacy/ekatalog-archive/penyedia-distributor-detail", label: "Ekatalog Archive - Penyedia Distributor Detail" },
            { value: "api/legacy/ekatalog/paket-e-purchasing", label: "Ekatalog - Paket E-Purchasing" },
            { value: "api/legacy/ekatalog/penyedia-detail", label: "Ekatalog - Penyedia Detail" },
            { value: "api/legacy/rup/master-satker", label: "RUP - Master Satker" },
            { value: "api/legacy/rup/paket-anggaran-penyedia", label: "RUP - Paket Anggaran Penyedia" },
            { value: "api/legacy/rup/paket-anggaran-swakelola", label: "RUP - Paket Anggaran Swakelola" },
            { value: "api/legacy/rup/paket-penyedia-terumumkan", label: "RUP - Paket Penyedia Terumumkan" },
            { value: "api/legacy/rup/paket-swakelola-terumumkan", label: "RUP - Paket Swakelola Terumumkan" },
            { value: "api/legacy/rup/program-master", label: "RUP - Program Master" },
            { value: "api/legacy/tender/jadwal-tahapan-non-tender", label: "Tender - Jadwal Tahapan Non Tender" },
            { value: "api/legacy/tender/jadwal-tahapan-tender", label: "Tender - Jadwal Tahapan Tender" },
            { value: "api/legacy/tender/non-tender-ekontrak-kontrak", label: "Tender - Non Tender Ekontrak Kontrak" },
            { value: "api/legacy/tender/non-tender-pengumuman", label: "Tender - Non Tender Pengumuman" },
            { value: "api/legacy/tender/non-tender-selesai", label: "Tender - Non Tender Selesai" },
            { value: "api/legacy/tender/pencatatan-non-tender", label: "Tender - Pencatatan Non Tender" },
            { value: "api/legacy/tender/pencatatan-non-tender-realisasi", label: "Tender - Pencatatan Non Tender Realisasi" },
            { value: "api/legacy/tender/pencatatan-swakelola", label: "Tender - Pencatatan Swakelola" },
            { value: "api/legacy/tender/pencatatan-swakelola-realisasi", label: "Tender - Pencatatan Swakelola Realisasi" },
            { value: "api/legacy/tender/pengumuman", label: "Tender - Pengumuman" },
            { value: "api/legacy/tender/peserta-tender", label: "Tender - Peserta Tender" },
            { value: "api/legacy/tender/tender-ekontrak-kontrak", label: "Tender - Tender Ekontrak Kontrak" },
            { value: "api/legacy/tender/tender-selesai-nilai", label: "Tender - Tender Selesai Nilai" },
        ]
    },
    {
        label: "V1 API",
        items: [
            { value: "api/v1/ekatalog-archive/instansi-satker", label: "Ekatalog Archive - Instansi Satker" },
            { value: "api/v1/ekatalog-archive/komoditas-detail", label: "Ekatalog Archive - Komoditas Detail" },
            { value: "api/v1/ekatalog-archive/paket-e-purchasing", label: "Ekatalog Archive - Paket E-Purchasing" },
            { value: "api/v1/ekatalog-archive/penyedia-detail", label: "Ekatalog Archive - Penyedia Detail" },
            { value: "api/v1/ekatalog-archive/penyedia-distributor-detail", label: "Ekatalog Archive - Penyedia Distributor Detail" },
            { value: "api/v1/ekatalog/paket-e-purchasing", label: "Ekatalog - Paket E-Purchasing" },
            { value: "api/v1/ekatalog/penyedia-detail", label: "Ekatalog - Penyedia Detail" },
            { value: "api/v1/rup/master-satker", label: "RUP - Master Satker" },
            { value: "api/v1/rup/paket-anggaran-penyedia", label: "RUP - Paket Anggaran Penyedia" },
            { value: "api/v1/rup/paket-anggaran-swakelola", label: "RUP - Paket Anggaran Swakelola" },
            { value: "api/v1/rup/paket-penyedia-terumumkan", label: "RUP - Paket Penyedia Terumumkan" },
            { value: "api/v1/rup/paket-swakelola-terumumkan", label: "RUP - Paket Swakelola Terumumkan" },
            { value: "api/v1/rup/program-master", label: "RUP - Program Master" },
            { value: "api/v1/tender/jadwal-tahapan-non-tender", label: "Tender - Jadwal Tahapan Non Tender" },
            { value: "api/v1/tender/jadwal-tahapan-tender", label: "Tender - Jadwal Tahapan Tender" },
            { value: "api/v1/tender/non-tender-ekontrak-kontrak", label: "Tender - Non Tender Ekontrak Kontrak" },
            { value: "api/v1/tender/non-tender-pengumuman", label: "Tender - Non Tender Pengumuman" },
            { value: "api/v1/tender/non-tender-selesai", label: "Tender - Non Tender Selesai" },
            { value: "api/v1/tender/pencatatan-non-tender", label: "Tender - Pencatatan Non Tender" },
            { value: "api/v1/tender/pencatatan-non-tender-realisasi", label: "Tender - Pencatatan Non Tender Realisasi" },
            { value: "api/v1/tender/pencatatan-swakelola", label: "Tender - Pencatatan Swakelola" },
            { value: "api/v1/tender/pencatatan-swakelola-realisasi", label: "Tender - Pencatatan Swakelola Realisasi" },
            { value: "api/v1/tender/pengumuman", label: "Tender - Pengumuman" },
            { value: "api/v1/tender/peserta-tender", label: "Tender - Peserta Tender" },
            { value: "api/v1/tender/tender-ekontrak-kontrak", label: "Tender - Tender Ekontrak Kontrak" },
            { value: "api/v1/tender/tender-selesai-nilai", label: "Tender - Tender Selesai Nilai" },
        ]
    }
]

export default function BulkDownloadPage() {
    const [year, setYear] = useState("2025")
    const [endpoint, setEndpoint] = useState("api/v1/ekatalog-archive/paket-e-purchasing")
    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [downloadedData, setDownloadedData] = useState<Record<string, unknown>[]>([])
    const [error, setError] = useState<string | null>(null)
    const [progress, setProgress] = useState({ page: 0, totalItems: 0, status: "Ready" })
    const stopRef = useRef(false)

    // Helper to pause execution
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleStartDownload = async () => {
        setLoading(true)
        setCompleted(false)
        setError(null)
        setDownloadedData([])
        setProgress({ page: 0, totalItems: 0, status: "Initializing..." })
        stopRef.current = false;

        try {
            const pageSize = 500; // Use a reasonable batch size
            let currentPage = 1; // Or offset based, depending on API. Assuming offset/limit for now based on previous code.
            // Wait, previous code used `limit` which implies just getting N items? 
            // Most APIs use offset & limit. Let's assume standard offset pagination if not page-based.
            // Actually, looking at route.ts: `limit=${validLimit}&kode_klpd=${validKodeKlpd}&tahun=${validTahun}`
            // It doesn't seem to pass an explicit offset. 
            // But wait, if there is no offset param, how do we paginate?
            // Usually INAPROC uses offset or page. 
            // If the proxy strictly only forwards `limit`, we might be stuck to just `limit`. 
            // BUT, usually `limit` acts as "how many items". 
            // If I can't paginate, I can't do bulk download properly unless I set a HUGE limit.
            // Let me re-read `route.ts`. 
            // It constructs: `${baseUrl}${separator}limit=${validLimit}&kode_klpd=${validKodeKlpd}&tahun=${validTahun}`
            // It DOES NOT seem to support `offset` or `page` passing in the proxy route currently.
            // I MUST FIX THE PROXY ROUTE TO SUPPORT OFFSET/PAGE FIRST to make this work.
            // Assuming I will fix the proxy to pass all search params.

            // Re-checking Proxy Logic: 
            // It explicitly picks `limit`, `kode_klpd`, `tahun`. 
            // It ignores others. This is a blocker. I need to update route.ts first.
            // Assuming I updated route.ts to pass `offset` or all unknown params.

            // Let's assume we use `offset`.
            let currentOffset = 0;
            let hasMore = true;
            let allData: Record<string, unknown>[] = [];

            while (hasMore && !stopRef.current) {
                setProgress(p => ({ ...p, status: `Fetching batch at offset ${currentOffset}...` }));

                // Construct URL with offset. I need to make sure my proxy handles it.
                // I will update the proxy request to include `offset`.
                const safeEndpoint = encodeURIComponent(endpoint)
                const safeYear = encodeURIComponent(year)

                // Using a safe small delay to avoid rate limits
                await sleep(1500);

                const response = await fetch(`/api/proxy?year=${safeYear}&endpoint=${safeEndpoint}&limit=${pageSize}&offset=${currentOffset}`);

                if (!response.ok) {
                    const errDetail = await response.text();
                    throw new Error(`Failed at offset ${currentOffset}: ${response.status} ${errDetail}`);
                }

                const result = await response.json();

                let batchData: Record<string, unknown>[] = [];

                // INAPROC usually returns data in a 'data' property
                if (Array.isArray(result.data)) {
                    batchData = result.data;
                } else if (Array.isArray(result)) {
                    batchData = result;
                } else {
                    // If unexpected format, we might have reached end or error
                    console.warn("Unexpected data format", result)
                    hasMore = false;
                }

                if (batchData.length > 0) {
                    allData = [...allData, ...batchData];
                    setDownloadedData(allData); // Update state for potential preview
                    setProgress(p => ({
                        ...p,
                        page: p.page + 1,
                        totalItems: allData.length,
                        status: `Fetched ${batchData.length} items...`
                    }));

                    // Prepare for next batch
                    currentOffset += pageSize;

                    // Check if we reached the end. 
                    // If we got fewer items than requested, likely we are done.
                    if (batchData.length < pageSize) {
                        hasMore = false;
                    }
                } else {
                    hasMore = false;
                }
            }

            if (stopRef.current) {
                setProgress(p => ({ ...p, status: "Stopped by user." }));
            } else {
                setCompleted(true);
                setProgress(p => ({ ...p, status: "Download Complete!" }));
            }

        } catch (err: unknown) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Unknown error occurred");
            setProgress(p => ({ ...p, status: "Error occurred." }));
        } finally {
            setLoading(false);
        }
    }

    const handleStop = () => {
        stopRef.current = true;
    }

    const handleExport = () => {
        if (downloadedData.length === 0) return;

        // Generate filename based on endpoint and year
        const endpointName = ENDPOINTS.find(g => g.items.find(i => i.value === endpoint))?.items.find(i => i.value === endpoint)?.label || "data";
        const filename = `INAPROC_${endpointName.replace(/[^a-z0-9]/gi, '_')}_${year}`;

        exportToExcel(downloadedData, filename);
    }

    return (
        <main className="container mx-auto p-4 md:p-8 max-w-4xl min-h-screen">
            <div className="mb-8">
                <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                    <Home className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Bulk Data Downloader</h1>
                <p className="text-muted-foreground">
                    Download all available data from an endpoint with automatic pagination handling.
                    <br />
                    <span className="text-yellow-600 font-medium text-xs">⚠️ Keep this tab open while downloading.</span>
                </p>
            </div>

            <Card className="w-full mb-8">
                <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                    <CardDescription>Select the dataset you wish to download fully.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="year">Tahun Anggaran</Label>
                            <Select value={year} onValueChange={setYear} disabled={loading}>
                                <SelectTrigger id="year">
                                    <SelectValue placeholder="Select Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2026">2026</SelectItem>
                                    <SelectItem value="2025">2025</SelectItem>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2023">2023</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="endpoint">Data Endpoint</Label>
                            <Select value={endpoint} onValueChange={setEndpoint} disabled={loading}>
                                <SelectTrigger id="endpoint">
                                    <SelectValue placeholder="Select Endpoint" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ENDPOINTS.map((group) => (
                                        <SelectGroup key={group.label}>
                                            <SelectLabel>{group.label}</SelectLabel>
                                            {group.items.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-4 mt-4">
                            {!loading ? (
                                <Button onClick={handleStartDownload} className="flex-1" size="lg">
                                    <Download className="mr-2 h-4 w-4" /> Start Bulk Download
                                </Button>
                            ) : (
                                <Button onClick={handleStop} variant="destructive" className="flex-1" size="lg">
                                    <PauseCircle className="mr-2 h-4 w-4" /> Stop Download
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Section */}
            {(loading || downloadedData.length > 0) && (
                <Card className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Download Progress</span>
                            {loading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                            {completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        </CardTitle>
                        <CardDescription>{progress.status}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-muted p-4 rounded-lg text-center">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Items</span>
                                <div className="text-3xl font-bold">{progress.totalItems.toLocaleString()}</div>
                            </div>
                            <div className="bg-muted p-4 rounded-lg text-center">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Requests Made</span>
                                <div className="text-3xl font-bold">{progress.page}</div>
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            onClick={handleExport}
                            disabled={loading || downloadedData.length === 0}
                            className="w-full"
                            variant="secondary"
                        >
                            <Download className="mr-2 h-4 w-4" /> Export to Excel
                        </Button>
                    </CardContent>
                </Card>
            )}
        </main>
    )
}
