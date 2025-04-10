import { PageContainer } from '@/components/PageContainer';
import { FaGithub, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
import { MdEmail, MdLocationOn } from 'react-icons/md';

export default function ContactPage() {
  return (
    <PageContainer title="Contact">
      <div className="relative mb-8 max-w-4xl mx-auto">
        <img
          src="/images/Sociail-office.png"
          alt="Sociail Office"
          className="w-full rounded-xl shadow-md"
        />
        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-center text-sm md:text-base px-4 py-3 rounded-b-xl backdrop-blur-sm">
          🏖️ Welcome to Our Global Headquarters and the Sociail "Beach Office"!
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h1>
      <p className="text-lg mb-8">
        I&apos;m always open to connecting with fellow entrepreneurs, technologists, and anyone passionate 
        about building the future. Feel free to reach out using the form below or connect with me on social media.
      </p>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                required
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason for Contact</label>
              <select
                id="reason"
                name="reason"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
              >
                <option>General Inquiry</option>
                <option>Speaking / Media</option>
                <option>Collaboration</option>
                <option>Investment / Business</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
                required
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Find Me Online</h2>
          <div className="space-y-4">
            {/* LinkedIn - First */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                {FaLinkedin({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                <a href="https://www.linkedin.com/in/sualp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  linkedin.com/in/sualp
                </a>
              </div>
            </div>
            
            {/* GitHub - Second */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                {FaGithub({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                <a href="https://github.com/msualp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  github.com/msualp
                </a>
              </div>
            </div>

            {/* X (Twitter) - Third */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                {FaXTwitter({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">X (formerly Twitter)</p>
                <a href="https://x.com/msualp_sociail" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  @msualp_sociail
                </a>
              </div>
            </div>

            {/* Email - Fourth */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                {MdEmail({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <a href="mailto:mustafa@sualp.com" className="text-blue-600 hover:underline">
                  mustafa@sualp.com
                </a>
              </div>
            </div>

            {/* Office - Same styling as "Find Me Online" */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Office</h2>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 hover:scale-105 transition">
                  {MdLocationOn({ className: "h-5 w-5 text-blue-600 dark:text-blue-400" })}
                </div>
                <div>
                  <p>
                    Sociail, Inc.<br />
                    511 N Boardwalk, Bower Beach<br />
                    Rehoboth Beach, DE 19971, USA
                  </p>
                  <a
                    href="https://www.google.com/maps/place/511+N+Boardwalk,+Rehoboth+Beach,+DE+19971"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-block mt-2"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
