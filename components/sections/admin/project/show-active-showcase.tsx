'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { getCurrentShowcase } from '@/lib/actions/projects/get-current-showcase'

const ShowActiveShowcase = () => {
  const [showcase, setShowcase] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadShowcase() {
      try {
         const data = await getCurrentShowcase();
        setShowcase(data);
      } catch (error) {
        console.error(error)
        toast.error("Something went wrong.")
      } finally {
        setLoading(false)
      }
    }
    loadShowcase()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex justify-between items-center">
          <span>
            Current Showcase
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {showcase ? (
          <div key={showcase.id} className="flex flex-col items-start gap-1">
            <Label className="text-2xl font-bold">{showcase.title}</Label>
            <span className="text-sm text-muted-foreground">
              By: {showcase.devs?.join(", ")}
            </span>
            <span className="text-xs text-muted-foreground">
              Published: {showcase.published_date}
            </span>
          </div>
        ) : (
          <p>No current showcase project set.</p>
        )}
      </CardContent>
    </Card>
  )
}

export default ShowActiveShowcase
