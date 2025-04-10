import Image from 'next/image';
import Link from 'next/link';
import { PageContainer } from '@/components/PageContainer';
import { BlobShape } from '@/components/SvgShapes';

export default function AboutPage() {
  return (
    <>
      {/* Custom Hero Layout with animated watermark keywords */}
      <section className="bg-black py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* First line - left to right */}
          <div className="animate-marquee whitespace-nowrap text-[8vw] font-extrabold text-gray-700/20 absolute top-0" style={{ animationDuration: '60s' }}>
            Productivity · Flow · LLMs · Sociail · Multi-Agent · Reinvention · Vision · Learning · Alignment · Assessment ·&nbsp;
            Productivity · Flow · LLMs · Sociail · Multi-Agent · Reinvention · Vision · Learning · Alignment · Assessment ·
          </div>
          
          {/* Second line - right to left */}
          <div className="animate-marquee-reverse whitespace-nowrap text-[8vw] font-extrabold text-gray-700/20 absolute top-[8vw]" style={{ animationDuration: '60s' }}>
            Innovation · AI · Collaboration · Leadership · Growth · Strategy · Execution · Creativity · Purpose · Impact ·&nbsp;
            Innovation · AI · Collaboration · Leadership · Growth · Strategy · Execution · Creativity · Purpose · Impact ·
          </div>
          
          {/* Third line - left to right */}
          <div className="animate-marquee whitespace-nowrap text-[8vw] font-extrabold text-gray-700/20 absolute top-[16vw]" style={{ animationDuration: '60s' }}>
            Technology · Future · Potential · Transformation · Insight · Knowledge · Wisdom · Experience · Journey · Vision ·&nbsp;
            Technology · Future · Potential · Transformation · Insight · Knowledge · Wisdom · Experience · Journey · Vision ·
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white relative z-10 mb-2">
          Mustafa Sualp
        </h1>
        <p className="text-lg md:text-xl text-gray-300 relative z-10 max-w-2xl mx-auto">
          Tech Entrepreneur, AI Enthusiast, Lifelong Learner
        </p>
      </section>

      <PageContainer title="">
      {/* Profile Section - Enhanced with larger font and better spacing */}
      <div className="flex flex-col md:flex-row items-center mb-8 mt-8">
        <Image
          src="/images/Mustafa-Sualp-Sociail-BW.png"
          alt="Mustafa Sualp"
          width={160}
          height={160}
          className="rounded-xl mr-6 mb-4 md:mb-0 border border-white/20 shadow-md"
        />
        <div>
          <h2 className="text-4xl font-bold">Mustafa Sualp</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-1">
            CEO & Founder, Sociail
          </p>
        </div>
      </div>

      <p className="text-lg mb-6">
        I&apos;m Mustafa Sualp, a serial entrepreneur, technologist, and AI enthusiast with a passion for 
        building products that enhance human potential.
      </p>

      {/* Enhanced blockquote with better styling */}
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-600 text-gray-800 dark:text-gray-100 italic mb-12">
        "True innovation requires a vision that dares to look beyond the horizon — and a team willing to build the bridge to get there."
      </div>

      {/* Notable Achievements Section */}
      <section className="my-20">
        <h3 className="text-center text-sm font-bold text-blue-600 uppercase mb-2">Meet the Founder</h3>
        <h2 className="text-3xl font-extrabold text-center mb-10">Notable Achievements</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Lead a global team to remote work success', description: 'As we transitioned to a new world order during the pandemic, found my passion for maximizing human productivity with asynchronous collaboration.' },
            { icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, title: 'Presided over 70%+ growth during COVID', description: 'During unprecedented global pandemic and societal challenges leading to successful exit.' },
            { icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Delivered strong investor returns', description: 'Generated significant value through sustainable growth and strategic positioning.' },
            { icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: 'Innovated against strong odds', description: 'Leading a small startup against strong incumbents that helped change higher ed\'s approach to student-centered assessment for learning.' },
            { icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>, title: 'Dared to imagine and do', description: 'Built bold solutions from scratch with little precedent — guided by belief and persistence.' },
            { icon: <svg className="text-blue-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>, title: 'Lead with service and accountability at heart', description: '"We are the good guys and gals of the story" and doing the right thing never goes out of style.' }
          ].map(({ icon, title, description }, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="mb-4 group-hover:scale-110 transform transition-transform duration-300">{icon}</div>
              <h4 className="text-lg font-semibold text-blue-600 mb-2">{title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Future Innovator Image Section */}
      <div className="relative mt-12 mb-12 max-w-4xl mx-auto">
        <Image
          src="/images/future-innovator-in-trainign.png"
          alt="Mustafa and Luke - Future innovator in training"
          width={800}
          height={450}
          className="rounded-xl shadow-md w-full object-cover"
        />
        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-center text-sm md:text-base px-4 py-3 rounded-b-xl backdrop-blur-sm">
          Mustafa & Luke — Future innovator in Training
        </div>
      </div>

      {/* My Story Section - Added better spacing and section styling with decorative blob */}
      <section className="mb-12 relative mt-12">
        {/* Decorative blob shape */}
        <div className="absolute -top-16 -right-16 text-blue-200 dark:text-blue-900 opacity-20 pointer-events-none">
          <BlobShape />
        </div>
        
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <svg className="text-blue-600 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          My Story
        </h3>
        
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
          Today, I&apos;m focused on my newest venture, Sociail—a platform that seamlessly integrates AI into daily workflows, 
          redefining how teams collaborate, make decisions, and create new solutions. I believe we&apos;re at the beginning of a 
          transformative era where AI will fundamentally change how we work and create value.
        </p>
      </section>

      {/* My Approach - Enhanced with better styling */}
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <svg className="text-blue-600 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          My Approach
        </h3>
        
        <p className="mb-4">
          I believe in building technology that enhances human capabilities rather than replacing them. My approach to 
          product development centers on three core principles:
        </p>
        
        <ul className="list-none space-y-3 mb-4 ml-4">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="font-medium">User-centered design that solves real problems</span>
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="font-medium">Ethical AI development with transparency and fairness</span>
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="font-medium">Building for long-term impact over short-term gains</span>
          </li>
        </ul>
      </section>

      {/* Fun Facts Section */}
      <section className="mb-12 mt-12">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <svg className="text-blue-600 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          A Few Things About Me
        </h3>
        <ul className="space-y-3 mb-4 ml-4">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="font-medium">I once bootstrapped a startup for 8 years before its acquisition.</span>
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="font-medium">I love AI... but I also love classic cars.</span>
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            <span className="font-medium">I believe productivity is spiritual — flow is sacred.</span>
          </li>
        </ul>
      </section>

      {/* Professional Timeline - Enhanced with better visual styling and decorative blob */}
      <section className="mb-12 relative">
        {/* Decorative blob shape */}
        <div className="absolute -bottom-16 -left-16 text-indigo-200 dark:text-indigo-900 opacity-20 pointer-events-none rotate-45">
          <BlobShape />
        </div>
        
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <svg className="text-blue-600 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Professional Timeline
        </h3>
        
        <div className="relative pl-6 border-l-2 border-blue-600 space-y-12">
          {[
            { title: 'CEO & Founder, Sociail', date: '2021–Present', description: 'Building the future of AI-powered collaboration tools that seamlessly integrate into daily workflows.' },
            { title: 'CEO & Founder, AEFIS', date: '2012–2021', description: 'Led the company from inception to successful acquisition, growing it into a market-leading EdTech platform.' },
            { title: 'Founder, Tech Services Company', date: '2008–2012', description: 'Provided managed technology services to financial institutions while still in college.' },
          ].map((item, index) => (
            <div className="relative space-y-2" key={index}>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
              <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 text-center animate-fade-in-up opacity-0 animate-delay-500">
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 italic">
          ⚡ Fun Fact: <span className="font-medium">"Proud dad to an energetic toddler who's likely the youngest AI enthusiast I know!"</span>
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
          ...and yes, I am with the resistance.
        </p>
      </div>

      {/* Image Section */}
      <div className="relative mt-20 mb-12 max-w-4xl mx-auto">
        <Image
          src="/images/mustafa-desk-view.png"
          alt="Mustafa working at his desk"
          width={800}
          height={450}
          className="rounded-xl shadow-md w-full object-cover"
        />
        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-center text-sm md:text-base px-4 py-3 rounded-b-xl backdrop-blur-sm">
          🧠 Hardest worker in the room. Doing the thing is doing the thing.
        </div>
      </div>
      
      {/* Call to Action */}
      <p className="text-center mt-6">
        <Link href="/sociail" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          Learn more about the vision behind Sociail →
        </Link>
      </p>

      {/* Connect CTA */}
      <div className="text-center mt-12">
        <Link 
          href="/contact" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Let&apos;s Connect
        </Link>
      </div>

      {/* Signature Block */}
      <div className="mt-8 text-right italic text-xl text-gray-700 dark:text-gray-300">
        — Mustafa
      </div>
    </PageContainer>
    </>
  );
}
