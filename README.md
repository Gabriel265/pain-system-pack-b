# Pain System Pack-B – Website Application

## Overview

This application consists of a public-facing website and a private backend administration system.
The system has placeholder pages, fully functional pages, and a complete Projects CRUD workflow backed by a JSON data store synchronized with GitHub.

Authentication is handled via environment variables, no credentials are hardcoded.

---

## 1. Public Website (Frontend)

The public website consumes data from `projects.json` and displays it to end users.

### Header Navigation

The top navigation includes:

* Home
* About
* Contact
* Accessibility
* Login (button)

### Footer

The footer mirrors the header for consistent navigation and may include additional links when required.

### Homepage Sections

The homepage includes:

* Hero section
* About section
* Services preview
* Contact section

### File Locations

* Header & Footer: `src/components/common/`
* Homepage sections: `src/components/sections/`
* Website pages: `src/app/website/`

---

## 2. Administrator Area (Private Backend)

The admin system is a secured area accessible only after login.

### Authentication

Authentication uses environment variables that must be defined locally or in Vercel/Netlify:

```env
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

### System Sections

The backend is divided into three main areas, each with its own layout and navigation rules.

Each section contains a `layout` file that controls sidebar navigation visibility based on the active system area.

---

### i. Admin System

* Admin login
* Projects table
* Create / Edit / Delete projects
* JSON data synchronization with GitHub

---

### ii. Portal (Admin)

* Admin-only access
* Project CRUD operations
* Project status tagging:

  * `idea`
  * `build`
  * `live`

Portal Routes:

* `/builder`
* `/dashboard`
* `/notifications`
* `/projects`

---

### iii. Automation

#### a. Projects Builder

* Create, edit, delete projects
* Toggle Draft / Live status
* Writes changes to `projects.json`

#### b. VST Website Automation

* VST-specific automation logic
* Placeholder pages

---

## 3. API Routing & Data Management

All authentication and project CRUD logic is handled via API routes.

### API Location

```
src/app/api/
```

### API Routes

#### Auth

```
/api/auth
  ├── login
  └── check
```

* Handles login validation
* Verifies admin access

#### Projects

```
/api/projects
```

* Handles admin-side CRUD operations
* Updates the GitHub-hosted `projects.json` file

> Since Vercel/Netlify deployments are static after build, direct file mutation is not possible in production.
> Instead, API routes update the JSON file in GitHub, triggering a rebuild.

---

## 4. Folder Structure

```
root folder
.github
 ___ /workflows
     ___ pain-system-auto-deploy.yml #auto deploy script 

/src
├── /components
│   ├── /common        # Header, Footer, Sidebar
│   └── /sections      # Hero, About, Services, Contact
│
├── /app
│   ├── /(auth)        # Login page
│   ├── /admin
│   ├── /portal
│   │   ├── /builder
│   │   ├── /dashboard
│   │   ├── /notifications
│   │   └── /projects
│   │
│   ├── /website
│   │   ├── /about
│   │   ├── /accessibility-&-inclusion
│   │   ├── /contact
│   │   ├── /projects
│   │   │   └── [slug]
│   │   └── /services
│   │
│   ├── /automation
│   │   ├── /projects-builder
│   │   └── /vst-website-automation
│   │
│   └── /api
│       ├── /auth
│       │   ├── check
│       │   └── login
│       └── /projects
│
├── /project-store
│   └── projects.json
```

---

## 5. Deployment Strategy

The system uses two primary Git branches:

### Branches

* `main` → Production
* `ai-deploy` → Development

### Deployment Flow

1. Changes are pushed to `ai-deploy`
2. A GitHub Action automatically merges `ai-deploy` → `main`
3. Vercel detects the update on `main`
4. Production rebuild and deployment is triggered

Both branches are deployed, but only `main` is used for production.

---

## 6. AI-Assisted Development

The codebase is intentionally structured for AI-assisted development:

* Clear folder separation
* Predictable imports
* Descriptive naming
* Inline comments where necessary

This allows AI models to easily understand context, structure, and intent when working with the codebase.

---

## 7. Additional Documentation

For more details:

* System Architecture: `ARCHITECTURE.md`
* Run & Operations Guide: `RUNBOOK.md`

--- 

