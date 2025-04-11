'use client'

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 mt-8 backdrop-blur-sm bg-white/60 dark:bg-black/30">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Mustafa Sualp. All rights reserved.</p>
        <div className="flex space-x-6">
          <a
            href="https://twitter.com/mustafasualp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://www.linkedin.com/in/mustafasualp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/mustafasualp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
