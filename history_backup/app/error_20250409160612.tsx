'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="text-center my-20">
      <h2 className="text-3xl font-bold">Something went wrong!</h2>
      <p className="mt-4 mb-8">We apologize for the inconvenience. Please try again.</p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
