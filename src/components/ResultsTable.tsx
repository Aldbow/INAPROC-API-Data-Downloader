"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileSpreadsheet } from "lucide-react"
import * as XLSX from 'xlsx'

interface ResultsTableProps {
    data: Record<string, unknown>[]
}

export function ResultsTable({ data }: ResultsTableProps) {
    if (!data || data.length === 0) return null

    const keys = Object.keys(data[0])

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "INAPROC Data")

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        XLSX.writeFile(workbook, `inaproc_data_${timestamp}.xlsx`)
    }

    return (
        <Card className="w-full mt-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Results ({data.length} rows)</CardTitle>
                <Button variant="outline" onClick={handleExport}>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Export to Excel
                </Button>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {keys.map((key) => (
                                    <TableHead key={key} className="whitespace-nowrap">{key}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((row, i) => (
                                <TableRow key={i}>
                                    {keys.map((key) => (
                                        <TableCell key={key} className="whitespace-nowrap max-w-[200px] truncate" title={String(row[key])}>
                                            {String(row[key])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
