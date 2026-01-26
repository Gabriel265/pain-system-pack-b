AI Lab structur and routing

The AI lab is created in it own folder 'src/app/ai-lab' and can be accessed only through the admin side(protected with admin dashboard).

All routing to github in fetching repo files and all routing to AI agent for propmts is placed in the api folder specifically ai-lab folder:
	src/api/ai-lab

prerequists: 
1. make sure you create a github app and install it on the required repository.
2. Make sure these env variables are set in vercel/local .env


GITHUB_REPO=pain-system-pack-b
GITHUB_OWNER=Gabriel265


GITHUB_APP_ID=2602268

GITHUB_INSTALLATION_ID=102826136

GITHUB_PRIVATE_KEY=(make sure its set in new line format)


OPENAI_API_KEY=(open AI key)

VERCEL_PROJECT_SLUG = (this is the name of the project in vercel,mostly similar to github repo name or with slugs or different if changed)

VERCEL_TEAM_SLUG = this is the teaam/name of user in vercel


USAGE:
System gets files from github and passes along to AI, which depending on the prompt will make the requeste changes ut with the restrictions set(dot change price, dont install dependencies etc). AI will create a new branch if not pressent called ai-lab and commit the changes. Changes can be reviews through a link, code changes seen and also merge and discard buttons are used for each action. it uses GitHub Pull requests as the storage mechanism(as a prompts history), avoiding a separate database, but it relies on GitHub's API for retrieval. If multiple runs exist, the dashboard paginates them 



NOTE QUESTIONS: How is it saving the prompt and where?
is it really selecting files before prompt?
is it showing all changed files if multiple were changed?

steps
1.login
2.go to the AI-Lab section from the side bar panel
3.On the left hand side you will see the folder structure as of the 'ai-deploy' branch, which is connected to the'main'(production branch) with auto merge.  selected files/folders are appended to the prompt before it's sent to the backend. In the dashboard (ai-lab/page.js), the handleRun function collects the selected paths into selectedList (from the selectedPaths Set, which tracks checkboxes in the file tree). If any are selected, it creates an appendText like \n\nFocus on these files/folders: path1, path2, ... and concatenates it to the user's raw prompt to form fullPrompt. This fullPrompt is then sent in the POST body to /api/ai-lab/run as { prompt: fullPrompt }.The backend (api/ai-lab/run/route.js) receives this combined prompt and passes it directly to the OpenAI API as the user message, so the AI is aware of the focused files/folders during generation. After the run, selections are cleared (setSelectedPaths(new Set())).

 Unselected mean AI will have to determine the file needed for edit depending on the prompt.
4. on the left side is the propmt box, code preview window(when you click a file on the left side folder tree it will show here).
5.on the bottom it shows previous promts done by the AI, whe clicked it will open a detail page that shows lines removed and added from the file, also a folder structure on the left as on the 'ai-lab' branch. buttons to either merge it to ai-deploy which auto meges with the main branch or button to discard it. Also a button to preview the changes live as on ai-lab branch deployed on vercel.
