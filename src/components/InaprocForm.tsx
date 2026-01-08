"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface InaprocFormProps {
    onFetch: (year: string, endpoint: string, limit: string) => void
    loading: boolean
}

export function InaprocForm({ onFetch, loading }: InaprocFormProps) {
    const [year, setYear] = useState("2025")
    const [endpoint, setEndpoint] = useState("ekatalog-archive/paket-e-purchasing")
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
                                <SelectItem value="ekatalog-archive/paket-e-purchasing">Paket E-Purchasing (Archive)</SelectItem>
                                <SelectItem value="sirup/rup-paket-swakelola-terumumkan">RUP Paket Swakelola (Terumumkan)</SelectItem>
                                <SelectItem value="sirup/rup-paket-penyedia-terumumkan">RUP Paket Penyedia (Terumumkan)</SelectItem>
                                {/* Add more endpoints as needed */}
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
