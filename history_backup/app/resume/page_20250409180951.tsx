import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

export default function ResumePage() {
  return (
    <PageContainer title="Resume">
      <div className="flex justify-between items-center mb-8">
        <div></div> {/* Empty div for flex spacing since title is in PageContainer */}
        <a 
          href="#" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF
        </a>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Professional Summary</h2>
          <p>
            Serial entrepreneur and technology executive with 15+ years of experience building and scaling 
            software companies. Proven track record of leading teams from concept to acquisition, with expertise 
            in AI, SaaS, and EdTech. Currently focused on developing AI-powered collaboration tools that 
            enhance human potential.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Experience</h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">CEO & Founder</h3>
              <span className="text-sm text-gray-500">March 2023 - Present</span>
            </div>
            <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">Sociail, Inc.</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Leading development of an AI-powered collaboration platform that seamlessly integrates into daily workflows</li>
              <li>Raised seed funding from top-tier investors</li>
              <li>Built founding team of engineers, designers, and AI researchers</li>
              <li>Established strategic partnerships with enterprise clients for beta testing</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">Vice President, Assessment Solutions</h3>
              <span className="text-sm text-gray-500">September 2021 - June 2022</span>
            </div>
            <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">HelioCampus</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Led post-acquisition integration of AEFIS into HelioCampus</li>
              <li>Managed product strategy and roadmap for assessment management solutions</li>
              <li>Oversaw customer success and retention during transition</li>
              <li>Collaborated with executive team on overall company strategy</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">CEO & Founder</h3>
              <span className="text-sm text-gray-500">October 2012 - June 2022</span>
            </div>
            <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">AEFIS, Inc.</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Built and scaled a market-leading assessment management platform for higher education</li>
              <li>Grew from bootstrapped startup to successful acquisition by HelioCampus in 2021</li>
              <li>Developed innovative solutions for learning outcomes assessment, curriculum mapping, and accreditation</li>
              <li>Established partnerships with major higher education associations and technology providers</li>
              <li>Led team of 30+ across product, engineering, sales, and customer success</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">CEO & Founder</h3>
              <span className="text-sm text-gray-500">April 1999 - December 2017</span>
            </div>
            <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">UNTRA Corporation</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Founded and led managed technology services company serving financial services clients</li>
              <li>Provided enterprise software development, infrastructure solutions, and team augmentation</li>
              <li>Recognized twice as one of the Philadelphia 100® fastest growing companies</li>
              <li>Incubated and funded early development of AEFIS</li>
            </ul>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Education</h2>
          
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">Massachusetts Institute of Technology</h3>
              <span className="text-sm text-gray-500">January 2023 - May 2023</span>
            </div>
            <div className="text-lg font-medium mb-1">Professional Education, Artificial Intelligence & Machine Learning</div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">Drexel University&apos;s LeBow College of Business</h3>
              <span className="text-sm text-gray-500">August 1994 - June 1999</span>
            </div>
            <div className="text-lg font-medium mb-1">B.S., Commerce and Engineering</div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold mb-2">Leadership</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Strategic Planning</li>
                <li>Team Building & Management</li>
                <li>Product Vision & Roadmapping</li>
                <li>Fundraising & Investor Relations</li>
                <li>M&A Strategy & Execution</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Technical</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>AI/ML Product Development</li>
                <li>SaaS Architecture</li>
                <li>Enterprise Software Design</li>
                <li>Data Analytics & Visualization</li>
                <li>Cloud Infrastructure</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold border-b pb-2 mb-4">Awards & Recognition</h2>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Philadelphia 100® Award</strong> - AEFIS (2016)
            </li>
            <li>
              <strong>Philadelphia 100® Award</strong> - UNTRA Corporation (2009, 2017)
            </li>
            <li>
              <strong>EdTech Breakthrough Award</strong> - AEFIS (2020)
            </li>
          </ul>
        </section>
      </div>
    </PageContainer>
  );
}
