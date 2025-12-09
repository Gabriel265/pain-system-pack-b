import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";

async function getProject(slug) {
  const filePath = path.join(process.cwd(), "src/project-store/projects.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const projects = JSON.parse(jsonData);
  return projects.find((p) => p.slug === slug && p.status === "active");
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "src/project-store/projects.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const projects = JSON.parse(jsonData);

   return projects
    .filter((p) => p.status === "active")
    .map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const project = await getProject(slug);
  if (!project) notFound();

  // Format dates nicely
  const createdAt = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedAt = new Date(project.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-4xl p-12 bg-card rounded-3xl shadow-2xl border border-border">
        {/* Back Button */}
        <Link
          href="/website/projects"
          className="mb-6 inline-block text-sm text-primary font-semibold hover:underline"
        >
          ← Back
        </Link>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-primary mb-8">
          {project.title}
        </h1>

        {/* Status Badge */}
        <span className="inline-block mb-6 px-4 py-1 text-sm font-semibold rounded-full bg-primary text-primary-foreground">
          {project.status.toUpperCase()}
        </span>

        {/* Description */}
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto">
          {project.description}
        </p>

        {/* Additional Fields */}
        <div className="text-left text-lg md:text-xl space-y-2 text-muted-foreground max-w-4xl mx-auto">
          <p>
            <span className="font-semibold text-foreground">Category:</span>{" "}
            {project.category}
          </p>
          <p>
            <span className="font-semibold text-foreground">Created At:</span>{" "}
            {createdAt}
          </p>
          <p>
            <span className="font-semibold text-foreground">Updated At:</span>{" "}
            {updatedAt}
          </p>
        </div>
      </div>
    </div>
  );
}
