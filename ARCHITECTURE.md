
1. High-level architecture

   - We have two applications sharing one source of data (GitHub):
   - Public Site (Frontend / Read-only)
   - Reads data from a static data store: src/projects-store/projects.json
   - No direct database
   - No auth
   - Deployed on Vercel

2. Admin Backend (Control Panel / CMS)
   - Authenticated admin UI
   - Performs CRUD operations
   - Does NOT talk to a database
   - Instead, it:
   - Modifies files in GitHub
   - Commits changes
   - Pushes to a branch

3. Data flow (step-by-step)
    A. Read path (Public site)

        User
         ↓
        Public Website
         ↓
        imports projects.json at build time
         ↓
        Static / ISR pages served by Vercel

    B. Write path (Admin)

    Admin User
     ↓
    Admin UI
     ↓
    POST / PUT / DELETE
     ↓
    app/api/projects/route.js
     ↓
    GitHub API (commit file changes)
     ↓
    Push to ai-deploy (dev) branch
     ↓
    GitHub Action
     ↓
    Merge ai-deploy → main
     ↓
    Vercel rebuild triggered
     ↓
    Public site updated



4. Architecture diagram


           ┌──────────────┐
           │   Admin UI   │
           └──────┬───────┘
                  │
          API Route (CRUD)
                  │
           ┌──────▼───────┐
           │   GitHub     │
           │ projects.json│
           └──────┬───────┘
                  │
         GitHub Action (merge)
                  │
           ┌──────▼───────┐
           │   Vercel     │
           │   Build      │
           └──────┬───────┘
                  │
           ┌──────▼───────┐
           │ Public Site  │
           └──────────────┘



