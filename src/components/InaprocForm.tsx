"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface InaprocFormProps {
    onFetch: (year: string, endpoint: string, limit: string) => void
    loading: boolean
}

export function InaprocForm({ onFetch, loading }: InaprocFormProps) {
    const [year, setYear] = useState("2025")
    const [endpoint, setEndpoint] = useState("api/v1/ekatalog-archive/paket-e-purchasing")
    const [limit, setLimit] = useState("5")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onFetch(year, endpoint, limit)
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>INAPROC Data Downloader</CardTitle>
                <CardDescription>Select parameters to fetch data from INAPROC API.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="year">Tahun Anggaran</Label>
                        <Select value={year} onValueChange={setYear}>
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
                        <Select value={endpoint} onValueChange={setEndpoint}>
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

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="limit">Jumlah Data (Limit)</Label>
                        <Input
                            id="limit"
                            type="number"
                            placeholder="5"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                        />
                    </div>

                    <Button type="submit" disabled={loading} className="mt-4">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Fetching..." : "Fetch Data"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
