import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function ProjectsPage() {
  const filePath = path.join(process.cwd(), 'src/project-store/projects.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(jsonData);
  const liveProjects = projects.filter(p => 
  p.status && ['live', 'active'].includes(p.status.toLowerCase())
);

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-black text-center mb-16 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {liveProjects.map(project => (
            <Link
              key={project.id}
              href={`/website/projects/${project.slug}`}
              className="group block"
            >
              <div className="bg-card border border-border rounded-3xl p-10 hover:shadow-2xl transition-all group-hover:-translate-y-6">
                <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                <span className="text-orange-500 font-bold text-lg group-hover:underline">
                  View Project →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
