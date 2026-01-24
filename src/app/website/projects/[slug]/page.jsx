import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Rocket,
  Wrench,
  Lightbulb,
  ArrowLeft,
  Calendar,
  Tag,
  AlertCircle,
} from "lucide-react";

/* =======================
   UTILITIES / CONSTANTS
   ======================= */

/**
 * Absolute path to the local project store.
 */
const PROJECTS_PATH = path.join(process.cwd(), "src/project-store/projects.json");

/**
 * Read all projects from the JSON store.
 * Single read point
 */
function readProjects() {
  const raw = fs.readFileSync(PROJECTS_PATH, "utf8");
  return JSON.parse(raw);
}

/**
 * Normalize raw status values coming from data.
 * Ensures UI logic only deals with known states.
 */
function normalizeStatus(status) {
  if (!status) return "concept";

  const s = status.toLowerCase().trim();

  if (s === "Live") return "live";
  if (s.includes("build") || s.includes("development")) return "in-build";

  // Fallback protection for unexpected values
  return ["live", "in-build", "concept"].includes(s) ? s : "concept";
}

/**
 * Status configuration map.
 * Controls iconography, colors, messaging, and UI behavior per status.
 */
const STATUS = {
  live: {
    icon: Rocket,
    label: "Live",
    bg: "bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-500/20",
    message: "This project is fully functional and available for use.",
    showDetails: true,
  },
  "in-build": {
    icon: Wrench,
    label: "In-Build",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    message:
      "This project is actively under development. Features and details may change.",
    showDetails: true,
  },
  concept: {
    icon: Lightbulb,
    label: "Concept",
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/20",
    message:
      "This project is planned for a future phase. Details are preliminary.",
    showDetails: false,
  },
};

/* =======================
   DATA ACCESS
   ======================= */

/**
 * Fetch a single project by slug.
 * Returns null when not found so caller can trigger 404.
 */
async function getProjectBySlug(slug) {
  const projects = readProjects();
  const found = projects.find((p) => p.slug === slug);

  if (!found) return null;

  return { ...found, status: normalizeStatus(found.status) };
}

/**
 * Static generation helper.
 * Ensures all project pages are pre-rendered at build time.
 */
export async function generateStaticParams() {
  return readProjects().map((p) => ({ slug: p.slug }));
}

/* =======================
   PAGE
   ======================= */

export default async function ProjectPage({ params }) {
  /**
   * Slug comes from dynamic route segment.
   */
  const { slug } = await params;

  /**
   * Load project data.
   * Redirect to 404 if slug is invalid.
   */
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  /**
   * Date formatting for metadata display.
   * Falls back to em dash when not provided.
   */
  const createdAt = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const updatedAt = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  /**
   * Status configuration lookup.
   * Drives visual style and conditional sections.
   */
  const cfg = STATUS[project.status];
  const StatusIcon = cfg.icon;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Spacer for fixed navigation */}
      <div className="h-16 md:h-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back navigation */}
          <Link
            href="/website/projects"
            className="inline-flex items-center gap-2 text-sm md:text-base text-primary font-semibold hover:underline mb-6 md:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Main project card */}
          <div
            className={`bg-card border-2 ${cfg.border} rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl`}
          >
            {/* Status and category badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6 md:mb-8">
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base font-semibold ${cfg.bg} ${cfg.text}`}
              >
                <StatusIcon className="w-4 h-4 md:w-5 md:h-5" />
                {cfg.label}
              </span>

              {project.category && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base bg-muted/20 text-gray-600 border border-border">
                  <Tag className="w-4 h-4" />
                  {project.category}
                </span>
              )}
            </div>

            {/* Project title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 md:mb-8 leading-tight">
              {project.title}
            </h1>

            {/* Status explanation block */}
            <div
              className={`${cfg.bg} border ${cfg.border} rounded-xl p-4 md:p-6 mb-6 md:mb-8`}
            >
              <div className="flex items-start gap-3">
                <AlertCircle
                  className={`w-5 h-5 md:w-6 md:h-6 mt-0.5 ${cfg.text}`}
                />
                <p className={`text-sm md:text-base ${cfg.text}`}>
                  {cfg.message}
                </p>
              </div>
            </div>

            {/* Description section */}
            <section className="mb-8 md:mb-10">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Description
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* Conditional details section */}
            {cfg.showDetails ? (
              <section className="border-t border-border pt-6 md:pt-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-6">
                  Project Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <Detail label="Created" value={createdAt} />
                  <Detail label="Last Updated" value={updatedAt} />
                </div>
              </section>
            ) : (
              <section className="border-t border-border pt-6 md:pt-8">
                {/* Concept-only placeholder */}
                <div className="bg-muted/10 rounded-xl p-6 md:p-8 text-center">
                  <Lightbulb className="w-12 h-12 md:w-16 md:h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-3">
                    Coming in Future Phases
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                    This project is in the concept stage. Check back later for updates.
                  </p>
                </div>
              </section>
            )}

            {/* Primary actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10">
              <Link
                href="/website/projects"
                className="flex-1 bg-primary hover:bg-orange-600 text-primary-foreground px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-medium transition hover:shadow-lg text-center"
              >
                Explore More Projects
              </Link>

              {/* External launch link only shown for live projects */}
              {project.status === "live" && project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 border-2 border-border hover:border-primary text-gray-800 hover:text-primary px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-medium transition text-center"
                >
                  Launch Project
                </a>
              )}
            </div>
          </div>

          {/* Support block for live projects only */}
          {project.status === "live" && (
            <div className="mt-6 md:mt-8 bg-card border border-border rounded-2xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Need Help?
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                This project is live. If something breaks, contact support.
              </p>
              <Link
                href="/website/contact"
                className="text-primary font-semibold hover:underline"
              >
                Contact Support →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =======================
   SUBCOMPONENTS
   ======================= */

/**
 * Simple key/value display for project metadata.
 */
function Detail({ label, value }) {
  return (
    <div className="bg-muted/10 rounded-xl p-4 md:p-6">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        <span className="text-sm md:text-base font-semibold">{label}</span>
      </div>
      <p className="text-sm md:text-base text-gray-600">{value}</p>
    </div>
  );
}
