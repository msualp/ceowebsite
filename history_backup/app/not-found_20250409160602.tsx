import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center my-20">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 mb-8">Sorry, we couldn't find what you were looking for.</p>
      <Link 
        href="/" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
      >
        Return Home
      </Link>
    </div>
  )
}
