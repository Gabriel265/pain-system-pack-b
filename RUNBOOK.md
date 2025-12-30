Getting Started

    Prerequisites

    Ensure you have the following installed:

    Node.js 

    npm or yarn

    Git

    Environment Variables

    Create a .env file (or configure environment variables in your hosting platform) with the following values:

    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=secure_password

    GITHUB_TOKEN=github_pat_****
    GITHUB_OWNER=your_github_username
    GITHUB_REPO=repository_name (e.g. pain-system-pack-b)
    GITHUB_BRANCH=main


    Notes on GITHUB_TOKEN

        Go to GitHub → Profile → Settings

        Open Developer settings

        Select Personal access tokens → Fine-grained tokens

        Create a new token

        Give it a name

        Grant read and write permissions to all required repository permissions


Installation
    Local Development

        Clone the repository:

        git clone https://github.com/Gabriel265/pain-system-pack-b.git


        Navigate into the project directory:

        cd thepainsystem


        Install dependencies:

        npm install


        Start the development server:

        npm run dev

Deployment to Netlify/Vercel
    1. Branch Setup

    Use main for production

    Use ai-deploy for development

    ⚠️ Important:
    Before making changes, always pull the latest changes first to keep projects.json in sync and avoid accidentally overwriting GitHub data.

2. Push Project to GitHub

    Ensure your project is pushed to the GitHub repository. Netlify will deploy directly from this repo.

3. Create a GitHub Access Token

    Go to GitHub → Profile → Settings

    Open Developer settings

    Select Personal access tokens → Fine-grained tokens

    Create a new token and give it a descriptive name

4. Add GitHub Token to Repository Secrets

    Open your GitHub repository

    Go to Settings → Secrets and variables → Actions

    Under the Secrets tab, create a new repository secret:

    Name: GH_PAT

    Value: your GitHub Personal Access Token

5. ## Netlify Deployment Steps

### 1. Connect Your Repository

* Make sure your project is on **GitHub**.
* In Netlify, click **“Connect to Git”**.
* If already connected, go straight to **“Deploy Project”**.

---

### 2. Select Repository

* Choose your repository (e.g., `pain-system-pack-b`).

---

### 3. Configure Build Settings

* **Project name:** Enter any name you like.
* **Branch to deploy:** `main` (this will be your production branch)
* **Base directory:** leave **blank**
* **Build command:** `npm run build`
* **Publish directory:** `.next`
* **Functions directory:** leave **blank/as is**

---

### 4. Set Environment Variables

Add the following environment variables with your actual values:

```
ADMIN_EMAIL=youremail@email.com
ADMIN_PASSWORD=yourpassword
GITHUB_TOKEN=github_pat****
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repo-name
GITHUB_BRANCH=main
```

---

### 5. Deploy

* Leave other settings as default.
* Click **“Deploy”**.

---

### 6. Set Up Domains

Go to **Site Settings → Domain Management**:

* **Production:** `domain.com` (from `main` branch)
* **Development:** `dev.domain.com` (from `ai-deploy` branch)

#### Option A: Single Netlify Site with Branch Deploys

1. Go to **Deploys → Branches**
2. Add `ai-deploy` branch
3. Enable **Branch deploys** and assign it to `dev.domain.com`

#### Option B: Separate Netlify Site (optional)

1. Create a new site from the same repo
2. Set the branch to `ai-deploy`
3. Assign it to `dev.domain.com`

> Option A is simpler; Option B allows fully independent environments.

---

This version is clearer, structured, and easier to follow for anyone deploying the project.

If you want, I can also **update it for the `@netlify/plugin-nextjs` plugin** with `.netlify/output` instead of `.next`, which is the correct setup for Next.js v13+ on Netlify.

Do you want me to do that?


6. How Updates Work

    Admin updates projects via the admin portal → updates projects.json in GitHub
    OR

    Admin edits projects.json directly in GitHub

    Flow:

    GitHub commit is made

    Github workflow script is triggerd

    Vercel/Netlify detects the change

    Vercel/Netlify rebuilds the site

    Website displays updated data

7. Domain Configuration

    ⚠️ Note:
    The domain should be configured in Vercel/Netlify settings buy going to domains and adding the domain, which later you wll be given dns records to add to your domain records.