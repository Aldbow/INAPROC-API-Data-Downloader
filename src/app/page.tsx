"use client"

import { useState } from "react"
import { InaprocForm } from "@/components/InaprocForm"
import { ResultsTable } from "@/components/ResultsTable"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [data, setData] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInaprocData = async (year: string, endpoint: string, limit: string) => {
    setLoading(true)
    setError(null)
    setData([])

    try {
      const safeEndpoint = encodeURIComponent(endpoint)
      const safeYear = encodeURIComponent(year)
      const safeLimit = encodeURIComponent(limit)

      // Using string template instead of URLSearchParams to maintain control over the exact string format if needed,
      // but encoding components is critical.
      const response = await fetch(`/api/proxy?year=${safeYear}&endpoint=${safeEndpoint}&limit=${safeLimit}`, {
        method: "GET",
      })

      const result = await response.json()

      if (!response.ok) {
        const errorMessage = result.error ? `${result.error}${result.details ? `: ${result.details}` : ''}` : result.details || "Failed to fetch data";
        throw new Error(errorMessage)
      }

      // INAPROC usually returns data in a 'data' property
      if (Array.isArray(result.data)) {
        setData(result.data)
      } else if (Array.isArray(result)) {
        setData(result)
      } else {
        console.warn("Unexpected data format", result)
        setData([])
        setError("Unexpected data format received from API")
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-6xl min-h-screen">
      <div className="mb-8 text-center pt-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">INAPROC API Downloader</h1>
        <p className="text-muted-foreground">
          fetch and download procurement data securely.
        </p>
        <div className="mt-4">
          <Link href="/bulk-download">
            <Button variant="outline">Go to Bulk Downloader</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <InaprocForm onFetch={fetchInaprocData} loading={loading} />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ResultsTable data={data} />
      </div>
    </main>
  )
}
