import PageContainer from '@/components/PageContainer';

export default function JourneyPage() {
  return (
    <PageContainer title="My Professional Journey">
      <p className="text-xl mb-8">From EdTech Innovator to AI Collaboration Pioneer</p>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead mb-8">
          As a tech startup CEO with a proven track record, including a recent successful exit, 
          I am now focused on my latest venture—delivering easy AI-powered collaboration to everyone. 
          I am a passionate serial entrepreneur, AI enthusiast, do-er, futurist, innovator, servant leader, 
          and devoted lifelong learner.
        </p>
        
        <div className="relative border-l-4 border-blue-500 pl-8 py-4 mb-12">
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[10px] top-0"></div>
          <h2 className="text-2xl font-bold">Sociail, Inc.</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">March 2023 - Present</p>
          <p>
            As the CEO and Founder of Sociail, I am dedicated to enabling seamless AI-powered collaboration for everyone. 
            Sociail provides a unified platform that brings together the best of human and AI collaboration. 
            Join me on this journey as we revolutionize human-first collaborative AI!
          </p>
        </div>
        
        <div className="relative border-l-4 border-blue-500 pl-8 py-4 mb-12">
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[10px] top-0"></div>
          <h2 className="text-2xl font-bold">HelioCampus</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">September 2021 - June 2022</p>
          <p>
            Leveraging my experience in founding and scaling AEFIS into a top-tier EdTech enterprise, 
            I played a pivotal role in orchestrating its seamless merger with HelioCampus. 
            As the Vice President of Assessment Solutions at HelioCampus, I remained dedicated to 
            ensuring smooth integration and overseeing critical transitions post-acquisition.
          </p>
        </div>
        
        <div className="relative border-l-4 border-blue-500 pl-8 py-4 mb-12">
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[10px] top-0"></div>
          <h2 className="text-2xl font-bold">AEFIS</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">October 2012 - June 2022</p>
          <p>
            Founded in 2012, AEFIS went from boot-strapped startup to a leading EdTech company offering 
            SaaS based Assessment Management Solution to HigherEd. In 2018 successfully completed a 
            Seed Funding Round, which allowed us to continue rapid growth during COVID and successful exit in September 2021.
          </p>
          <p className="mt-2">
            I am forever grateful for my amazing team (A-Team), our incredible investors, our advisors and mentors, 
            and phenomenal partners (aka clients), and for the opportunity we have been given to create a 
            strong positive social impact during a time of uncertainty and disruption.
          </p>
        </div>
        
        <div className="relative border-l-4 border-blue-500 pl-8 py-4 mb-12">
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[10px] top-0"></div>
          <h2 className="text-2xl font-bold">UNTRA Corporation</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">April 1999 - December 2017</p>
          <p>
            Untra provided managed technology services, enterprise software development, infrastructure and cloud solutions, 
            surge capacity, and team augmentation for companies in the financial services sector. 
            Untra helped fund and incubate the early development and growth of AEFIS, INC.
          </p>
        </div>
        
        <div className="relative border-l-4 border-blue-500 pl-8 py-4 mb-12">
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[10px] top-0"></div>
          <h2 className="text-2xl font-bold">Drexel University</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">1996 - 2009</p>
          <p>
            <strong>Information Systems Consultant (1999-2009)</strong><br/>
            Designed and developed the BIOMED Continous Quality Improvement (CQI) system for the management of 
            assessment data gathering and analysis for ABET Accreditation. Subsequently, commercialized the concepts 
            through technology transfer of IP, and started a new business to help universities and colleges transition 
            to authentic assessment for learning and improve student success at scale through effective software.
          </p>
          <p className="mt-2">
            <strong>Information Systems & Technology Manager (1996-2004)</strong><br/>
            Led the design and implementation of web communications and information exchange infrastructure 
            on the intranet and the Internet.
          </p>
        </div>
        
        <h2 className="text-2xl font-bold mt-12 mb-6">Education</h2>
        <div className="grid gap-6 mb-12">
          <div className="bg-gray-50/80 dark:bg-gray-800/80 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold">Massachusetts Institute of Technology</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">January 2023 - May 2023</p>
            <p>Professional Education, Artificial Intelligence & Machine Learning</p>
          </div>
          
          <div className="bg-gray-50/80 dark:bg-gray-800/80 p-6 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-bold">Drexel University&apos;s LeBow College of Business</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">August 1994 - June 1999</p>
            <p>B.S., Commerce and Engineering</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Honors & Awards</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold">Untra - Winner of the 2009 Philadelphia 100® Awards</h3>
            <p>Recognition for being one of the fastest growing companies in the Philadelphia region.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Untra - Winner of the 2017 Philadelphia 100® Awards</h3>
            <p>Continued recognition for sustained growth and business excellence.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">AEFIS - 2016 Philadelphia 100® Award Recipient</h3>
            <p>Acknowledgment of AEFIS&apos;s rapid growth in the EdTech sector.</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
