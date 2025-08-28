import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ErrorTest() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error("This is a test error to demonstrate error handling!")
  }

  const triggerError = () => {
    setShouldError(true)
  }

  const triggerAsyncError = async () => {
    // Simulate an async error
    await new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Async error occurred!"))
      }, 100)
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Error Handling Test</CardTitle>
        <CardDescription>Test the error handling system by triggering different types of errors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={triggerError} variant="destructive" className="w-full">
          Trigger JavaScript Error
        </Button>

        <Button onClick={triggerAsyncError} variant="outline" className="w-full">
          Trigger Async Error
        </Button>

        <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded">
          <p>This component allows you to test:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>JavaScript errors (caught by ErrorBoundary)</li>
            <li>Route errors (caught by LayoutWrapper)</li>
            <li>Error page display in different layouts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
