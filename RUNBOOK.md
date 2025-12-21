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

5. Connect Netlify to GitHub

    Go to Netlify → Add new site → Import from Git

    Choose GitHub

    Select your repository

    Use the default build settings:

    Build command: npm run build

    Publish directory: .next

6. Configure Environment Variables in Netlify

    Go to:

    Site Settings → Environment Variables

    Add the following:

    ADMIN_EMAIL

    ADMIN_PASSWORD

    GITHUB_TOKEN

    GITHUB_OWNER

    GITHUB_REPO

    GITHUB_BRANCH

7. Enable Auto-Redeploy

    Go to Site Settings → Build & Deploy → Continuous Deployment

    Enable:

    Auto Publish Deploys

8. How Updates Work

    Admin updates projects via the admin portal → updates projects.json in GitHub
    OR

    Admin edits projects.json directly in GitHub

    Flow:

    GitHub commit is made

    Github workflow script is triggerd

    Vercel/Netlify detects the change

    Vercel/Netlify rebuilds the site

    Website displays updated data

9. Domain Configuration

    ⚠️ Note:
    The domain should be configured in Vercel/Netlify settings buy going to domains and adding the domain, which later you wll be given dns records to add to your domain records.