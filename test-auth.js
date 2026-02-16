require('dotenv').config({ path: '.env.local' });  // ← add this at top

const { createAppAuth } = require("@octokit/auth-app");

async function test() {
  console.log("Env check after dotenv:", {
    appId: process.env.GITHUB_APP_ID,
    installId: process.env.GITHUB_INSTALLATION_ID,
    privateKeyLength: process.env.GITHUB_PRIVATE_KEY?.length || 0,
    privateKeyStartsWith: process.env.GITHUB_PRIVATE_KEY?.substring(0, 30) || 'missing',
  });

  if (!process.env.GITHUB_APP_ID) {
    console.error("Missing GITHUB_APP_ID");
    return;
  }
  if (!process.env.GITHUB_INSTALLATION_ID) {
    console.error("Missing GITHUB_INSTALLATION_ID");
    return;
  }
  if (!process.env.GITHUB_PRIVATE_KEY) {
    console.error("Missing GITHUB_PRIVATE_KEY");
    return;
  }

  const auth = createAppAuth({
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, "\n"),
  });

  try {
    const token = await auth({
      type: "installation",
      installationId: Number(process.env.GITHUB_INSTALLATION_ID),
    });
    console.log("Success! Token:", token.token.substring(0, 10) + "...");
  } catch (err) {
    console.error("Auth failed:", err.message);
    if (err.response) {
      console.error("GitHub response:", err.response.status, err.response.data);
    }
  }
}

test();