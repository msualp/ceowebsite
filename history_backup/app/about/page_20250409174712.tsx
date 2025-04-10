import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <h1 className="text-4xl font-bold mb-4">About Me</h1>
      
      <div className="glass p-8 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <Image
            src="/images/profile.jpg"
            alt="Profile Photo"
            width={100}
            height={100}
            className="rounded-full mr-4 mb-4 md:mb-0"
          />
          <div>
            <h2 className="text-2xl font-semibold">Mustafa Sualp</h2>
            <p className="text-gray-700 dark:text-gray-300">
              CEO & Founder, Sociail
            </p>
          </div>
        </div>

        <p className="mb-4">
          I'm Mustafa Sualp, a serial entrepreneur, technologist, and AI enthusiast with a passion for 
          building products that enhance human potential.
        </p>

        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
          "Focus on solving real problems for users, and you'll build something that lasts."
        </blockquote>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">My Story</h2>
          
          <p className="mb-4">
            My journey in technology began at Drexel University, where I studied Commerce and Engineering. While still in 
            college, I started my first company, providing managed technology services to financial institutions. This early 
            experience taught me the fundamentals of building and scaling a business, and ignited my passion for 
            entrepreneurship.
          </p>
          
          <p className="mb-4">
            In 2012, I founded AEFIS, an assessment management platform for higher education. What started as a bootstrapped 
            startup grew into a market-leading EdTech company, culminating in a successful acquisition in 2021. Building AEFIS 
            taught me invaluable lessons about patience, resilience, and the power of solving real problems for users.
          </p>
          
          <p className="mb-4">
            Today, I'm focused on my newest venture, Sociail—a platform that seamlessly integrates AI into daily workflows, 
            redefining how teams collaborate, make decisions, and create new solutions. I believe we're at the beginning of a 
            transformative era where AI will fundamentally change how we work and create value.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">Professional Timeline</h2>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mt-1">2021-Present</span>
              <div>
                <h3 className="font-semibold">CEO & Founder, Sociail</h3>
                <p className="text-gray-700 dark:text-gray-300">Building the future of AI-powered collaboration tools.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mt-1">2012-2021</span>
              <div>
                <h3 className="font-semibold">CEO & Founder, AEFIS</h3>
                <p className="text-gray-700 dark:text-gray-300">Led the company from inception to successful acquisition.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mt-1">2008-2012</span>
              <div>
                <h3 className="font-semibold">Founder, Tech Services Company</h3>
                <p className="text-gray-700 dark:text-gray-300">Provided managed technology services to financial institutions.</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4">My Approach</h2>
          
          <p className="mb-4">
            I believe in building technology that enhances human capabilities rather than replacing them. My approach to 
            product development centers on three core principles:
          </p>
          
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>User-centered design that solves real problems</li>
            <li>Ethical AI development with transparency and fairness</li>
            <li>Building for long-term impact over short-term gains</li>
          </ul>
        </section>
      </div>

      <div className="text-center">
        <Link
          href="/contact"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md
                     hover:bg-blue-500 transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
