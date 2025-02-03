import { Github, Twitter } from 'lucide-react';
import Navigation from './components/Navigation';
import ProjectCard from './components/ProjectCard';
import ArticleCard from './components/ArticleCard';
import '../fonts.css';

const projects = [
    {
        title: "Project One",
        description: "A revolutionary web application built with React and TypeScript.",
        stars: 128,
    },
    {
        title: "Project Two",
        description: "An innovative solution for modern web development.",
        stars: 89,
    },
    {
        title: "Project Two",
        description: "An innovative solution for modern web development.",
        stars: 89,
    },
    {
        title: "Project Two",
        description: "An innovative solution for modern web development.",
        stars: 89,
    },
];

const articles = [
    {
        title: "Building Modern Web Applications",
        date: "March 15, 2024",
        category: "Development",
        views: 1200,
        slides: 45,
    },
    {
        title: "The Future of Frontend Development",
        date: "March 1, 2024",
        category: "Technology",
        views: 800,
        slides: 32,
    },
    {
        title: "The Future of Frontend Development",
        date: "March 1, 2024",
        category: "Technology",
        views: 800,
        slides: 32,
    },
    {
        title: "The Future of Frontend Development",
        date: "March 1, 2024",
        category: "Technology",
        views: 800,
        slides: 32,
    },
    {
        title: "The Future of Frontend Development",
        date: "March 1, 2024",
        category: "Technology",
        views: 800,
        slides: 32,
    },
];

function App() {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 py-16 mt-32">
        <div className="grid grid-cols-2 gap-16">
          {/* Left Column - Introduction */}
          <div>
            <h1 className="text-4xl font-bold mb-6">
              Hello, I'm<br />
              <span className="text-5xl">Muhammad adhil.</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              I'm a passionate software developer specializing in building exceptional digital experiences.
              Currently focused on creating accessible, human-centered products.
            </p>
            <Navigation />
            <div className="mt-8 flex items-center space-x-4 ">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Right Column - Projects & Articles */}
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
              <div className="space-y-4">
                {articles.map((article, index) => (
                  <ArticleCard key={index} article={article} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;