# AI Lab – Let AI Make Code Changes for You

The **AI Lab** is a special tool inside your website dashboard.  
It lets you describe changes you want in the code (example: "make the header background blue" or "add a new button on the homepage"), and AI will suggest the changes safely.  
You can review them, see a live preview, and decide to accept (merge) or throw away (discard) the changes.

Everything is saved using **GitHub Pull Requests** (no extra database needed).  
The AI only works on a safe copy of your site (branch called `ai-lab`), so your live website is never touched until you say yes.

## Important – How It Works (Simple Explanation)

- You write what you want in a text box.
- You can optionally tick some files/folders on the left → AI will focus only on those.
  - If you don't tick anything → AI tries to guess which files to change based on your description.
- AI makes changes → creates/updates a branch called `ai-lab`.
- A new "proposal" appears in the list at the bottom (like a history of your requests).
- Click any proposal → see:
  - What you asked for (the prompt)
  - Which files changed
  - Green/red lines showing exactly what was added/removed
  - A live preview link (shows the site with changes)
  - Buttons: **Approve & Merge** (puts changes into production) or **Discard** (deletes the changes)

Prompts are saved inside the GitHub Pull Request description → that's why you see your old requests even after closing/reopening the page.

## Prerequisites – Things You Need Before It Works

You need to do these 3 things **once** (takes about 15–30 minutes the first time).

### 1. Create a GitHub App (this gives your website permission to change code on GitHub)

Follow these steps exactly:

1. Go to GitHub → log in → click your profile picture (top right) → **Settings**.
2. Scroll down left menu → click **Developer settings** (near bottom).
3. Click **GitHub Apps** → then **New GitHub App** button.
4. Fill in the form:
   - **GitHub App name**: Something simple like "My Website AI Editor"
   - **Homepage URL**: Put your website URL (example: https://yourwebsite.com)
   - **Callback URL**: You can leave blank or put the same homepage URL
   - **Webhook**: Uncheck "Active" (we don't need it)
5. Scroll down to **Permissions**:
   - **Repository contents**: Select **Read & write** (very important)
   - **Pull requests**: Select **Read & write**
   - **Metadata**: Read-only is fine (usually auto-selected)
   - Leave everything else as "No access"
6. Scroll to bottom → click **Create GitHub App**
7. After creation → you will see **App ID** near the top (example: 1234567) → copy it
8. Scroll to **Private keys** → click **Generate a private key**
   - A file downloads (ends with `.pem`) → open it in Notepad/TextEdit
   - Copy **everything** inside (including -----BEGIN...----- and new lines)
   - You will paste this later into Vercel

### 2. Install the GitHub App on Your Repository

1. Still on the same GitHub App settings page → scroll down to **Install App**
2. Click **Install** → choose **Only select repositories** → pick your repo (example: `pain-system-pack-b`)
3. Click **Install**
4. After install → go back to the App settings page → scroll to **Installations** or look at the URL
   - You can also go to: https://github.com/settings/installations
   - Click your app → you will see the **Installation ID** in the URL or on the page (example: 98765432) → copy it

### 3. Add Secrets to Vercel (the .env variables)

Go to your Vercel dashboard → your project → **Settings** → **Environment Variables**

Add these exactly (replace with your real values):

- Name: `GITHUB_REPO`  
  Value: `pain-system-pack-b` (your repo name, no quotes)

- Name: `GITHUB_OWNER`  
  Value: `Gabriel265` (your GitHub username or org name)

- Name: `GITHUB_APP_ID`  
  Value: the App ID you copied (example: `2602268`)

- Name: `GITHUB_INSTALLATION_ID`  
  Value: the Installation ID you found (example: `102826136`)

- Name: `GITHUB_PRIVATE_KEY`  
  Value: Paste the **entire** private key text (including -----BEGIN...----- and all new lines).  
  → Vercel supports multi-line values — just paste as-is. Do **not** remove line breaks!

- Name: `OPENAI_API_KEY`  
  Value: your OpenAI secret key (from https://platform.openai.com/account/api-keys)

- Name: `VERCEL_PROJECT_SLUG`  
  Value: usually your project name in Vercel (often same as repo name, but check in Vercel → Settings → General → look at "Project name" or preview URLs)

- Name: `VERCEL_TEAM_SLUG`  
  Value: if you are in a Vercel Team → your team slug (check preview URLs or leave empty if personal account)

- Name: `VERCEL_TOKEN`  
  Value: Vercel account settings -> Tokens -> create token with project scope

After adding → click **Redeploy** (top right in Vercel) so the changes take effect.

## How to Use AI Lab (Step by Step for Anyone)

1. Log in to your website admin dashboard.
2. In the sidebar → click **AI Lab**.
3. On the left → you see all folders/files from the live site (branch `ai-deploy`).
   - Tick checkboxes on files/folders you want AI to focus on (optional).
   - If you don't tick anything → AI guesses what to change.
4. In the big text box → write what you want (example: "Change the header background color to light blue in the main layout file").
5. Click **Generate Changes**.
6. Wait a few seconds → a new card appears at the bottom with your request.
7. Click the card → opens detail page:
   - See your exact words (prompt)
   - See changed files with green (added) / red (removed) lines
   - Click **Open Preview** → see live site with changes
   - If happy → click **Approve & Merge** (adds to live site)
   - If not → click **Discard**

You can do this as many times as you want. Old requests stay in the list forever.
!