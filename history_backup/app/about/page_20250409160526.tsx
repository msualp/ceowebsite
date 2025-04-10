export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead text-xl mb-8">
          I'm Mustafa Sualp, a serial entrepreneur, technologist, and AI enthusiast with a passion for 
          building products that enhance human potential.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">My Story</h2>
        <p>
          My journey in technology began at Drexel University, where I studied Commerce and Engineering. 
          While still in college, I started my first company, providing managed technology services to 
          financial institutions. This early experience taught me the fundamentals of building and 
          scaling a business, and ignited my passion for entrepreneurship.
        </p>
        
        <p className="mt-4">
          In 2012, I founded AEFIS, an assessment management platform for higher education. 
          What started as a bootstrapped startup grew into a market-leading EdTech company, 
          culminating in a successful acquisition in 2021. Building AEFIS taught me invaluable 
          lessons about patience, resilience, and the power of solving real problems for users.
        </p>
        
        <p className="mt-4">
          Today, I'm focused on my newest venture, Sociail—a platform that seamlessly integrates 
          AI into daily workflows, redefining how teams collaborate, make decisions, and create 
          new solutions. I believe we're at the beginning of a transformative era where AI will 
          fundamentally change how we work and create value.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Philosophy</h2>
        <p>
          I believe in building technology that amplifies human potential rather than replacing it. 
          The most powerful tools are those that feel like natural extensions of our capabilities—enhancing 
          our creativity, productivity, and connection with others.
        </p>
        
        <p className="mt-4">
          My approach to leadership is centered on three principles:
        </p>
        
        <ul className="mt-2 space-y-2">
          <li>
            <strong>Clarity of purpose</strong> — Ensuring everyone understands not just what we're 
            building, but why it matters.
          </li>
          <li>
            <strong>Empowerment through autonomy</strong> — Giving team members the freedom to solve 
            problems in their own way, while providing the support they need to succeed.
          </li>
          <li>
            <strong>Continuous learning</strong> — Embracing failure as a necessary part of innovation, 
            and creating a culture where feedback and growth are celebrated.
          </li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Beyond Work</h2>
        <p>
          When I'm not building companies, you'll find me exploring the latest developments in AI and 
          machine learning, mentoring early-stage founders, or spending time with my family. I'm also 
          an avid reader, particularly on topics related to technology, business strategy, and the 
          future of work.
        </p>
        
        <p className="mt-4">
          I'm always open to connecting with fellow entrepreneurs, technologists, and anyone passionate 
          about building the future. Feel free to reach out through the <a href="/contact" className="text-blue-600 hover:underline">contact page</a> 
          or connect with me on <a href="https://www.linkedin.com/in/sualp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>.
        </p>
      </div>
    </div>
  )
}
