import fs from "fs";
import path from "path";
import Link from "next/link";
import { Rocket, Wrench, Lightbulb, Eye } from "lucide-react";

export default function ProjectsPage() {
  /**
   * Read project data directly from local JSON store.
   * Any schema changes to projects.json are reflected here.
   */
  const filePath = path.join(process.cwd(), "src/project-store/projects.json");
  const projects = JSON.parse(fs.readFileSync(filePath, "utf8"));

  /**
   * Normalize project status values to a controlled set.
   * This prevents inconsistent casing or wording from breaking UI logic.
   */
  const normalizedProjects = projects.map((p) => ({
    ...p,
    status: normalizeStatus(p.status),
  }));

  /**
   * Split projects by lifecycle phase.
   * These arrays directly control which sections render.
   */
  const liveProjects = normalizedProjects.filter((p) => p.status === "live");
  const inBuildProjects = normalizedProjects.filter(
    (p) => p.status === "in-build",
  );
  const conceptProjects = normalizedProjects.filter(
    (p) => p.status === "concept",
  );

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Spacer to offset fixed header */}
      <div className="h-16 md:h-20" />

      {/* HERO SECTION */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary mb-4">
            Project lifecycle
          </p>

          <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-6">
            Projects, built in phases
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Every project is shown exactly as it is — live, in development, or
            still in concept. No guesswork, no inflated claims.
          </p>
        </div>
      </section>

      {/* STATUS LEGEND / GUIDE */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl">
            {/* Visual explanation of project statuses */}
            <StatusGuide
              icon={Rocket}
              title="Live"
              description="Available and fully functional."
              color="green"
            />
            <StatusGuide
              icon={Wrench}
              title="In build"
              description="Actively being developed."
              color="blue"
            />
            <StatusGuide
              icon={Lightbulb}
              title="Concept"
              description="Planned for a future phase."
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* LIVE PROJECTS SECTION */}
      {liveProjects.length > 0 && (
        <ProjectSection
          title="Live projects"
          icon={Rocket}
          iconColor="text-green-600"
          projects={liveProjects}
        />
      )}

      {/* IN-BUILD PROJECTS SECTION */}
      {inBuildProjects.length > 0 && (
        <section className="bg-card border-t border-border">
          <ProjectSection
            title="In-build projects"
            icon={Wrench}
            iconColor="text-blue-600"
            projects={inBuildProjects}
          />
        </section>
      )}

      {/* CONCEPT PROJECTS SECTION */}
      {conceptProjects.length > 0 && (
        <ProjectSection
          title="Concept projects"
          icon={Lightbulb}
          iconColor="text-purple-600"
          projects={conceptProjects}
          clickable={false} // Explicitly disable navigation for concepts
        />
      )}

      {/* FUTURE / PLACEHOLDER SECTION */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-primary mt-1" />
              <div>
                <h2 className="text-2xl font-serif font-light mb-2">
                  Project showroom (planned)
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  A curated space to explore confirmed launches and community
                  work. This will be introduced after the core platform is
                  complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

/**
 * Normalize raw status strings from data source into
 * a strict, predictable set used by UI logic.
 */
function normalizeStatus(status) {
  if (!status) return "concept";

  const value = status.toLowerCase().trim();

  if (value === "Live") return "live";
  if (value.includes("build") || value.includes("dev")) return "in-build";
  if (["live", "concept"].includes(value)) return value;

  // Fallback for unknown or malformed values
  return "concept";
}

/**
 * Small legend component used to explain project statuses.
 * Purely presentational.
 */
function StatusGuide({ icon: Icon, title, description, color }) {
  const colors = {
    green: "text-green-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
  };

  return (
    <div className="flex items-start gap-4">
      <Icon className={`w-5 h-5 mt-1 ${colors[color]}`} />
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

/**
 * Section wrapper for a group of projects.
 * Handles layout, heading, and icon.
 */
function ProjectSection({
  title,
  icon: Icon,
  iconColor,
  projects,
  clickable = true,
}) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Icon className={`w-6 h-6 ${iconColor}`} />
          <h2 className="text-3xl font-serif font-light">{title}</h2>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              clickable={clickable}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Individual project card.
 * Conditionally wrapped in a Link when navigation is allowed.
 */
function ProjectCard({ project, clickable }) {
  const content = (
    <div
      className={`border border-border rounded-xl p-6 h-full flex flex-col ${
        clickable ? "hover:shadow-md transition" : "opacity-70"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium">{project.title}</h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      {/* Call-to-action is dependent on project state */}
      {clickable && project.status === "live" ? (
        <span className="text-sm text-primary font-medium">View project →</span>
      ) : (
        <span className="text-sm text-gray-600 italic">Not yet available</span>
      )}
    </div>
  );

  // Only wrap in Link when navigation is allowed
  if (clickable && project.status === "live") {
    return (
      <Link href={`/website/projects/${project.slug}`} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * Visual badge representing project status.
 * Styling is mapped directly to normalized status values.
 */
function StatusBadge({ status }) {
  const map = {
    live: "bg-green-500/10 text-green-600",
    "in-build": "bg-blue-500/10 text-blue-600",
    concept: "bg-purple-500/10 text-purple-600",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${
        map[status] || map.concept
      }`}
    >
      {status.replace("-", " ")}
    </span>
  );
}
