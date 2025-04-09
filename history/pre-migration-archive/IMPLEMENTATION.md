Below is a fully working, multi‐page static site you can deploy to Vercel via GitHub—or zip up and host anywhere. It includes:

A Home (index.html) that introduces you and Sociail

An About page for your personal story and credibility

A Sociail page to detail the platform’s AI collaboration vision and prompt sign‐ups

An Insights (Blog) page with example posts (stored in /insights/)

A Contact page with a working form (via Formspree)

A Newsletter signup section (also via Formspree)

SEO meta tags

Google Analytics snippet (use your own measurement ID in place of G-XXXXXXXXXX)

Responsive CSS matching your style

All files are laid out in a simple folder structure for easy uploading to GitHub → Vercel. Just create a new GitHub repository, place these files/folders into it, and connect that repo to Vercel. Or zip up the folder and upload directly to other static hosts.

Tip: Look for the <!-- TODO --> comments where you should insert your own real info: form endpoints, images, and so on.

Folder Structure
perl
Copy
my-website/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   └── placeholder.jpg
├── insights/
│   ├── post1.html
│   └── post2.html
├── index.html
├── about.html
├── sociail.html
├── insights.html
├── contact.html
└── README.md
Below are the contents of each file. Copy these into your local files accordingly. Afterward, compress (zip) the my-website folder and you’ll have a ready‐to‐deploy package.

1. README.md (Optional)
markdown
Copy
# Mustafa Sualp - Personal + Sociail Website

This repository hosts a multi-page static site:

- **index.html** – Home page
- **about.html** – About Mustafa
- **sociail.html** – Sociail details
- **insights.html** – Blog/Insights listing
- **contact.html** – Contact form
- **/insights/post1.html & post2.html** – Example blog posts
- **/assets/css/style.css** – Site-wide styling
- **/assets/images/** – Placeholder images
- Google Analytics snippet in each HTML file (replace with your measurement ID).

## Deployment on Vercel

1. Fork or clone this repo.
2. Push it to your GitHub account.
3. Go to [Vercel.com](https://vercel.com), create a new project, and import this repository.
4. Vercel will automatically build and deploy your static site.
2. assets/css/style.css
Below is a Tailored version of your original design, plus extra classes for multi‐page usage:

css
Copy
/* VARIABLES & RESETS */
:root {
  --primary-color: #4169E1;
  --accent-color: #FFC107;
  --light-bg: #F5F8FF;
  --dark-text: #333;
  --light-text: #FFF;
  --gray-text: #666;
  --light-gray: #EEF2F7;
  --font-sans: -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  color: var(--dark-text);
  background-color: #FFF;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* HEADER & NAV */
header {
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--primary-color);
  text-decoration: none;
}

nav ul {
  display: flex;
  list-style: none;
  gap: 32px;
}

nav a {
  text-decoration: none;
  color: var(--dark-text);
  font-weight: 500;
  transition: color 0.2s ease;
}

nav a:hover {
  color: var(--primary-color);
}

/* HERO */
.hero {
  padding: 80px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 48px;
}

.hero-content {
  flex: 1;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hero-image img {
  max-width: 100%;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--primary-color), #5B7FFF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--gray-text);
  margin-bottom: 24px;
  font-weight: 400;
}

.intro {
  font-size: 1.125rem;
  margin-bottom: 32px;
  max-width: 600px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.cta-primary {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(65, 105, 225, 0.3);
}

.cta-secondary {
  background-color: white;
  color: var(--primary-color);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid var(--primary-color);
  transition: all 0.2s ease;
}

.cta-secondary:hover {
  background-color: var(--light-bg);
  transform: translateY(-2px);
}

/* "Currently Building" Banner */
.now-working {
  background-color: var(--light-bg);
  padding: 32px 0;
  margin: 80px 0;
  border-radius: 16px;
}

.now-working-content {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.now-badge {
  background-color: #10B981;
  color: white;
  padding: 8px 16px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.pulse {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

/* NAV BOXES */
.nav-boxes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 80px;
}

.nav-box {
  background-color: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.nav-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.nav-box-icon {
  background-color: var(--light-bg);
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: var(--primary-color);
  font-size: 1.5rem;
}

.nav-box h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.nav-box p {
  color: var(--gray-text);
  margin-bottom: 16px;
  font-size: 0.95rem;
}

.nav-box-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
}

.nav-box-link:hover {
  text-decoration: underline;
}

/* FOOTER */
footer {
  background-color: var(--light-bg);
  padding: 48px 0;
  margin-top: 80px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
    padding: 40px 0;
  }
  .hero-image {
    margin-bottom: 32px;
  }
  h1 {
    font-size: 2.5rem;
  }
  .subtitle {
    font-size: 1.25rem;
  }
  .cta-buttons {
    justify-content: center;
  }
  .now-working-content {
    flex-direction: column;
    text-align: center;
  }
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}

/* BLOG PAGE STYLES */
.blog-list {
  margin: 40px 0;
}

.blog-post {
  margin-bottom: 24px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
}

.blog-post h2 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.blog-post p {
  color: var(--gray-text);
}

.read-more {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}

/* CONTACT FORM */
.contact-form-container {
  max-width: 600px;
  margin: 40px auto;
}

.contact-form-container form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-form-container label {
  font-weight: 500;
}

.contact-form-container input[type="text"],
.contact-form-container input[type="email"],
.contact-form-container textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font: inherit;
}

.contact-form-container button {
  background-color: var(--primary-color);
  color: #fff;
  padding: 12px;
  border-radius: 4px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.contact-form-container button:hover {
  background-color: #3557bd;
}

/* NEWSLETTER SIGNUP */
.newsletter-signup {
  margin-top: 40px;
}

.newsletter-signup form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.newsletter-signup input[type="email"] {
  flex: 1;
  min-width: 200px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font: inherit;
}

.newsletter-signup button {
  background-color: var(--accent-color);
  color: #000;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.newsletter-signup button:hover {
  background-color: #e0a806;
}
3. assets/images/placeholder.jpg
Just include any placeholder image in this folder (e.g., a 500×600 jpg). You can replace references in the HTML with your own real images later.

4. Common HTML Snippets
All pages share the header and footer. You’ll see similar code repeated.
In the <head> section, we include:

UTF‐8 meta

Viewport

SEO <title> and <meta> descriptions (customize them!)

Google Analytics (replace G-XXXXXXXXXX with your real ID)

html
Copy
<!-- Common HEAD START -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO: Adjust titles/descriptions for each page -->
  <title>Mustafa Sualp - Entrepreneur & AI Visionary</title>
  <meta name="description" content="The official website of Mustafa Sualp, founder of Sociail and EdTech entrepreneur behind AEFIS." />

  <!-- OG Tags for Social Sharing (Optional) -->
  <meta property="og:title" content="Mustafa Sualp - Entrepreneur & AI Visionary" />
  <meta property="og:description" content="Transforming collaboration in the age of AI. Learn more about Sociail and my journey." />
  <meta property="og:image" content="https://your-domain.com/assets/images/placeholder.jpg" />
  <meta property="og:url" content="https://your-domain.com/" />

  <!-- Google Analytics (replace with your ID) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <!-- Link to CSS -->
  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<!-- Common HEAD END -->

<!-- Common HEADER START -->
<header>
  <a href="index.html" class="logo">Mustafa Sualp</a>
  <nav>
    <ul>
      <li><a href="about.html">About</a></li>
      <li><a href="sociail.html">Sociail</a></li>
      <li><a href="insights.html">Insights</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
</header>
<!-- Common HEADER END -->

<!-- Common FOOTER START -->
<footer>
  <div class="container">
    <div class="footer-content">
      <div>
        <p>© 2025 Mustafa Sualp. All rights reserved.</p>
      </div>
      <div class="social-links">
        <a href="https://www.linkedin.com/in/sualp/" class="social-link" target="_blank" rel="noopener noreferrer">
          <!-- LinkedIn Icon -->
          <svg width="20" height="20" ... > <!-- omitted for brevity --> </svg>
        </a>
        <a href="https://twitter.com" class="social-link" target="_blank" rel="noopener noreferrer">
          <!-- Twitter Icon -->
          <svg width="20" height="20" ... > <!-- omitted for brevity --> </svg>
        </a>
        <a href="https://instagram.com" class="social-link" target="_blank" rel="noopener noreferrer">
          <!-- Instagram Icon -->
          <svg width="20" height="20" ... > <!-- omitted for brevity --> </svg>
        </a>
      </div>
    </div>
  </div>
</footer>
<!-- Common FOOTER END -->
We’ll reuse this for each page, changing only <title> and <meta> where needed.

5. index.html (Home)
html
Copy
<!DOCTYPE html>
<html lang="en">
<!-- HEAD -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mustafa Sualp | Serial Entrepreneur & AI Collaboration Visionary</title>
  <meta name="description" content="Welcome to the official site of Mustafa Sualp. Reinventing human collaboration with Sociail—an AI platform for real-time chat and productivity." />

  <!-- OG & Analytics - replace IDs, images, etc. -->
  <meta property="og:title" content="Mustafa Sualp - Reinventing Human Collaboration with AI" />
  <meta property="og:description" content="Learn more about Sociail, an AI collaboration platform from Mustafa Sualp." />
  <meta property="og:image" content="https://your-domain.com/assets/images/placeholder.jpg" />
  <meta property="og:url" content="https://your-domain.com/" />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <!-- HEADER -->
  <div class="container">
    <header>
      <a href="index.html" class="logo">Mustafa Sualp</a>
      <nav>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="sociail.html">Sociail</a></li>
          <li><a href="insights.html">Insights</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>
  </div>

  <!-- HERO -->
  <div class="container">
    <section class="hero">
      <div class="hero-content">
        <h1>Creating the future of human-AI collaboration</h1>
        <p class="subtitle">Serial Entrepreneur, Visionary, AI Collaboration Pioneer</p>
        <p class="intro">
          I’m dedicated to reinventing how humans and AI work together, building on my experience
          as the founder who scaled and exited AEFIS, an EdTech SaaS that transformed higher ed assessment.
        </p>
        <div class="cta-buttons">
          <a href="sociail.html" class="cta-primary">Learn About Sociail →</a>
          <a href="about.html" class="cta-secondary">My Journey</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="assets/images/placeholder.jpg" alt="Mustafa Sualp" />
      </div>
    </section>
  </div>

  <!-- CURRENTLY BUILDING BANNER -->
  <div class="container">
    <section class="now-working">
      <div class="now-working-content">
        <div class="now-badge">
          <span class="pulse"></span>
          Currently Building
        </div>
        <div>
          <h2>Sociail: Reinventing collaboration for the AI age</h2>
          <p>A real-time collaborative AI chat platform at the intersection of open-source chat, productivity tools, and advanced AI. Beta launch coming soon.</p>
        </div>
      </div>
    </section>
  </div>

  <!-- NAV BOXES -->
  <div class="container">
    <div class="nav-boxes">
      <div class="nav-box" onclick="window.location='about.html'">
        <div class="nav-box-icon">🚀</div>
        <h3>My Journey</h3>
        <p>From bootstrapping to a successful exit, see how I’m applying lessons learned to launch Sociail.</p>
        <a href="about.html" class="nav-box-link">Read More →</a>
      </div>

      <div class="nav-box" onclick="window.location='sociail.html'">
        <div class="nav-box-icon">💡</div>
        <h3>Sociail Platform</h3>
        <p>Explore our approach to real-time AI collaboration, and see what sets us apart.</p>
        <a href="sociail.html" class="nav-box-link">Learn More →</a>
      </div>

      <div class="nav-box" onclick="window.location='insights.html'">
        <div class="nav-box-icon">✍️</div>
        <h3>Latest Insights</h3>
        <p>Thoughts on AI, entrepreneurship, and building technology that amplifies human potential.</p>
        <a href="insights.html" class="nav-box-link">Read Articles →</a>
      </div>

      <div class="nav-box" onclick="window.location='contact.html'">
        <div class="nav-box-icon">🤝</div>
        <h3>Connect</h3>
        <p>Interested in Sociail, potential partnerships, or just want to chat? I’d love to hear from you.</p>
        <a href="contact.html" class="nav-box-link">Get in Touch →</a>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <div class="footer-content">
        <div>
          <p>© 2025 Mustafa Sualp. All rights reserved.</p>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/sualp/" class="social-link" target="_blank">
            <!-- LinkedIn Icon -->
            <svg width="20" height="20" ...></svg>
          </a>
          <a href="https://twitter.com" class="social-link" target="_blank">
            <!-- Twitter Icon -->
            <svg width="20" height="20" ...></svg>
          </a>
          <a href="https://instagram.com" class="social-link" target="_blank">
            <!-- Instagram Icon -->
            <svg width="20" height="20" ...></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
6. about.html
html
Copy
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>About Mustafa Sualp - Founder & AI Visionary</title>
  <meta name="description" content="Learn about Mustafa Sualp's journey from bootstrapping AEFIS to launching Sociail, a real-time AI platform." />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <div class="container">
    <header>
      <a href="index.html" class="logo">Mustafa Sualp</a>
      <nav>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="sociail.html">Sociail</a></li>
          <li><a href="insights.html">Insights</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>
  </div>

  <div class="container">
    <section class="hero">
      <div class="hero-content">
        <h1>My Journey</h1>
        <p class="intro">
          Hi, I’m Mustafa. I’ve spent the last decade challenging the status quo in edtech, leading AEFIS to transform how higher education measures and improves learning outcomes. 
          After a successful private equity exit, I’m now focused on building Sociail—believing that real-time AI collaboration will fundamentally reshape how teams create and innovate.
        </p>
      </div>
      <div class="hero-image">
        <img src="assets/images/placeholder.jpg" alt="About Mustafa Sualp" />
      </div>
    </section>
  </div>

  <div class="container" style="margin: 40px 0;">
    <h2 style="margin-bottom: 16px;">A Lifelong Entrepreneurial Mindset</h2>
    <p style="margin-bottom: 16px;">
      I’ve always been driven by vision: to solve big, complex problems that can unlock human potential. 
      Whether it was pioneering new ways to empower educators or now bridging AI and human collaboration, 
      I’ve learned that perseverance, curiosity, and empathy are key to building products that truly make a difference.
    </p>
    <p style="margin-bottom: 16px;">
      Over the years, I’ve worked with a small, dedicated team to bring big ideas to life—scaling from zero to thousands of institutions, 
      forging strategic partnerships, and raising capital without losing sight of our mission. 
    </p>
  </div>

  <!-- Newsletter sign-up section -->
  <div class="container newsletter-signup">
    <h2>Join My Newsletter</h2>
    <p>Stay updated on Sociail’s progress and my latest articles on AI, productivity, and entrepreneurship.</p>
    <form action="https://formspree.io/f/yourFormID" method="POST">
      <!-- TODO: Replace with your actual Formspree endpoint or other email marketing tool -->
      <input type="email" name="email" placeholder="Enter your email" required />
      <button type="submit">Subscribe</button>
    </form>
  </div>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div>
          <p>© 2025 Mustafa Sualp. All rights reserved.</p>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/sualp/" class="social-link" target="_blank">
            <svg width="20" height="20" ...></svg>
          </a>
          <a href="https://twitter.com" class="social-link" target="_blank">
            <svg width="20" height="20" ...></svg>
          </a>
          <a href="https://instagram.com" class="social-link" target="_blank">
            <svg width="20" height="20" ...></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
7. sociail.html
html
Copy
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sociail - The Future of AI Collaboration</title>
  <meta name="description" content="Sociail is a real-time collaborative AI platform combining chat, productivity, and advanced AI. Learn about its mission and features." />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <div class="container">
    <header>
      <a href="index.html" class="logo">Mustafa Sualp</a>
      <nav>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="sociail.html">Sociail</a></li>
          <li><a href="insights.html">Insights</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>
  </div>

  <div class="container">
    <section class="hero">
      <div class="hero-content">
        <h1>Sociail</h1>
        <p class="subtitle">Real-Time Collaborative AI</p>
        <p class="intro">
          At Sociail, we believe that seamless integration of AI into daily workflows will redefine how teams collaborate, make decisions, and create new solutions. 
          Inspired by chat platforms like Slack and advanced AI models, we’re merging communication, productivity, and intelligence into one frictionless experience.
        </p>
        <div class="cta-buttons">
          <a href="#beta" class="cta-primary">Join Beta Waitlist</a>
          <a href="insights.html" class="cta-secondary">Read Insights</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="assets/images/placeholder.jpg" alt="Sociail Overview" />
      </div>
    </section>
  </div>

  <!-- Beta Waitlist Section -->
  <div class="container now-working" id="beta">
    <div class="now-working-content">
      <div class="now-badge">
        <span class="pulse"></span>
        Beta Sign-Up
      </div>
      <div>
        <h2>Be the First to Try Sociail</h2>
        <p>Experience real-time AI collaboration. Sign up to get early access to our upcoming beta and help shape the future of work.</p>
      </div>
    </div>
    <div style="padding: 24px 0;">
      <form action="https://formspree.io/f/yourFormID" method="POST">
        <!-- TODO: Replace with your actual Formspree or Mailchimp form endpoint -->
        <input type="email" name="email" placeholder="Your Email" required style="padding:12px; width:300px; max-width:100%; margin-right:8px;" />
        <button type="submit" style="padding:12px 24px; background:var(--primary-color); color:#fff; border:none; border-radius:4px; font-weight:600;">
          Request Access
        </button>
      </form>
    </div>
  </div>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div>
          <p>© 2025 Mustafa Sualp. All rights reserved.</p>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/sualp/" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
          <a href="https://twitter.com" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
          <a href="https://instagram.com" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
8. insights.html (Blog Listing)
html
Copy
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Insights - Mustafa Sualp</title>
  <meta name="description" content="Explore articles and insights on AI collaboration, entrepreneurship, and the future of work by Mustafa Sualp." />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <div class="container">
    <header>
      <a href="index.html" class="logo">Mustafa Sualp</a>
      <nav>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="sociail.html">Sociail</a></li>
          <li><a href="insights.html">Insights</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>

    <section class="blog-list">
      <h1>Insights</h1>
      <p>Thought leadership on AI, entrepreneurship, and building technologies that enhance human potential.</p>

      <div class="blog-post">
        <h2>1. The Rise of Real-Time AI Collaboration</h2>
        <p>How next-gen chat and productivity tools are paving the way for deeper, seamless AI integration.</p>
        <a href="insights/post1.html" class="read-more">Read More →</a>
      </div>

      <div class="blog-post">
        <h2>2. Lessons from Bootstrapping AEFIS</h2>
        <p>My top takeaways from scaling an edtech start-up with minimal resources to a private equity exit.</p>
        <a href="insights/post2.html" class="read-more">Read More →</a>
      </div>
    </section>
  </div>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div>
          <p>© 2025 Mustafa Sualp. All rights reserved.</p>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/sualp/" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
          <a href="https://twitter.com" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
          <a href="https://instagram.com" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
9. insights/post1.html (Example Blog Post)
html
Copy
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>The Rise of Real-Time AI Collaboration - Mustafa Sualp</title>
  <meta name="description" content="Dive into how real-time AI collaboration is changing the way teams work, communicate, and innovate." />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <link rel="stylesheet" href="../assets/css/style.css" />
</head>
<body>
  <div class="container">
    <header>
      <a href="../index.html" class="logo">Mustafa Sualp</a>
      <nav>
        <ul>
          <li><a href="../about.html">About</a></li>
          <li><a href="../sociail.html">Sociail</a></li>
          <li><a href="../insights.html">Insights</a></li>
          <li><a href="../contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>

    <article style="margin: 40px 0;">
      <h1>The Rise of Real-Time AI Collaboration</h1>
      <p style="color: var(--gray-text); margin-bottom: 24px;">Published on Apr 09, 2025 • by Mustafa Sualp</p>
      <p style="margin-bottom: 16px;">
        In the not-so-distant past, AI was something that only large enterprises could experiment with.
        Today, modern tools and open-source frameworks make AI accessible to startups, small teams,
        and even individual creators. But what does this mean for collaboration?
      </p>
      <p style="margin-bottom: 16px;">
        At Sociail, we’re integrating AI directly into real-time chat. Whether you’re brainstorming, delegating tasks,
        or drafting copy, AI is there to assist as if it were another team member—one that never sleeps, never loses context, 
        and can instantly reference the sum of human knowledge. 
      </p>
      <p style="margin-bottom: 16px;">
        Here’s why real-time collaboration with AI is a game changer...
      </p>
      <!-- More content goes here -->
    </article>
  </div>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div>
          <p>© 2025 Mustafa Sualp. All rights reserved.</p>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/sualp/" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
          <a href="https://twitter.com" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
          <a href="https://instagram.com" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
10. insights/post2.html (Example Blog Post)
html
Copy
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Lessons from Bootstrapping AEFIS - Mustafa Sualp</title>
  <meta name="description" content="Reflecting on key lessons learned while bootstrapping AEFIS in higher ed, from early struggle to eventual private equity exit." />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <link rel="stylesheet" href="../assets/css/style.css" />
</head>
<body>
  <div class="container">
    <header>
      <a href="../index.html" class="logo">Mustafa Sualp</a>
      <nav>
        <ul>
          <li><a href="../about.html">About</a></li>
          <li><a href="../sociail.html">Sociail</a></li>
          <li><a href="../insights.html">Insights</a></li>
          <li><a href="../contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>

    <article style="margin: 40px 0;">
      <h1>Lessons from Bootstrapping AEFIS</h1>
      <p style="color: var(--gray-text); margin-bottom: 24px;">Published on Apr 09, 2025 • by Mustafa Sualp</p>
      <p style="margin-bottom: 16px;">
        Building AEFIS was an incredible journey—from an underdog idea to a market‐leading assessment management platform
        used by institutions around the world. There were challenges at every step: raising funds, pitching to universities
        hesitant to adopt new tech, and forging a dedicated team when resources were scarce.
      </p>
      <p style="margin-bottom: 16px;">
        Here are the biggest lessons I learned along the way...
      </p>
      <!-- More content goes here -->
    </article>
  </div>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div>
          <p>© 2025 Mustafa Sualp. All rights reserved.</p>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/sualp/" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
          <a href="https://twitter.com" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
          <a href="https://instagram.com" class="social-link" target="_blank">
            <svg width="20" height="20" ... ></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
11. contact.html
html
Copy
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contact - Mustafa Sualp</title>
  <meta name="description" content="Get in touch with Mustafa Sualp for partnerships, investments, or to learn more about Sociail." />

  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>

  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <div class="container">
    <header>
      <a href="index.html" class="logo">Mustafa Sualp</a>
      <nav>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="sociail.html">Sociail</a></li>
          <li><a href="insights.html">Insights</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>
  </div>

  <div class="container contact-form-container">
    <h1>Contact</h1>
    <p>Interested in learning more about Sociail, potential partnerships, or investing? Fill out the form below or reach me directly on LinkedIn.</p>

    <form action="https://formspree.io/f/yourFormID" method="POST">
      <!-- TODO: Replace 'yourFormID' with your actual Formspree ID or your own backend endpoint -->
      <label for="name">Name</label>
      <input type="text" id="name" name="name" placeholder="Your Name" required />

      <label for="email">Email</label>
      <input type="email" id="email" name="email" placeholder="Your Email" required />

      <label for="message">Message</label>
      <textarea id="message" name="message" rows="6" placeholder="How can I help you?" required></textarea>

      <button type="submit">Send Message</button>
    </form>
  </div>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div>
          <p>© 2025 Mustafa Sualp. All rights reserved.</p>
        </div>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/sualp/" class="social-link" target="_blank">
            <svg width="20" height="20" ...></svg>
          </a>
          <a href="https://twitter.com" class="social-link" target="_blank">
            <svg width="20" height="20" ...></svg>
          </a>
          <a href="https://instagram.com" class="social-link" target="_blank">
            <svg width="20" height="20" ...></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
How to Zip & Deploy
Create a folder named my-website (or whatever you prefer).

Inside it, place all files/folders exactly as shown above:

index.html

about.html

sociail.html

insights.html

contact.html

insights/

assets/css/style.css

assets/images/placeholder.jpg

(Optional) README.md

Update:

Google Analytics ID in each file

<title> and <meta> descriptions to your liking

Form endpoints in newsletter and contact forms

Social media links

Zip the my-website folder into my-website.zip.

On GitHub: Create a new repository, upload these files, and then link the repo to Vercel.

Or, directly drag‐and‐drop the zip onto Vercel’s new project screen (if you want a quick test deployment).

This is a production‐ready static site. You can expand it or integrate advanced frameworks as needed. Good luck with your next big AI unicorn—Sociail!