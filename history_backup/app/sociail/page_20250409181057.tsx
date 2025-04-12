import PageContainer from '@/components/PageContainer';

export default function SociailPage() {
  return (
    <PageContainer title="Sociail">
      <section className="mb-12">
        <p className="text-xl mb-6">Real-Time Collaborative AI</p>
        <p className="mb-6">
          At Sociail, we believe that seamless integration of AI into daily workflows will redefine how teams collaborate, 
          make decisions, and create new solutions. Inspired by chat platforms like Slack and advanced AI models, 
          we're merging communication, productivity, and intelligence into one frictionless experience.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <a 
            href="#beta" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Join Beta Waitlist
          </a>
          <a 
            href="/insights" 
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
          >
            Read Insights
          </a>
        </div>
      </section>
      
      <section id="beta" className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="font-semibold">Beta Sign-Up</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Be the First to Try Sociail</h2>
        <p className="mb-6">
          Experience real-time AI collaboration. Sign up to get early access to our upcoming beta 
          and help shape the future of work.
        </p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-2 rounded border flex-grow dark:bg-gray-800 dark:border-gray-700"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Request Access
          </button>
        </form>
      </section>
      
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg shadow-sm backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-3">Contextual Understanding</h3>
            <p>
              Unlike traditional AI tools that operate in isolation, Sociail understands the full context of conversations.
              It follows threads, recalls previous discussions, and maintains awareness of project goals and constraints.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg shadow-sm backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-3">Seamless Integration</h3>
            <p>
              Sociail doesn&apos;t feel like a separate application—it blends into your existing workflow.
              It feels like a natural extension of your team&apos;s communication, not another tool to context-switch into.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg shadow-sm backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-3">Democratized Expertise</h3>
            <p>
              Sociail puts specialized knowledge at everyone&apos;s fingertips. Need to draft legal language? Analyze complex data? Write code?
              Our AI provides expert-level assistance across domains, elevating the capabilities of your entire team.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg shadow-sm backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-3">Human-First Design</h3>
            <p>
              Sociail is designed to amplify human potential, not replace it. By embedding intelligence directly into collaboration tools,
              teams can focus more on creative problem-solving and less on routine tasks.
            </p>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
