// Add this route: /src/app/api/agent/test/route.js
export async function GET() {
  try {
    const octokit = await getOctokit();
    const { data } = await octokit.request('GET /app');
    return NextResponse.json({ success: true, appName: data.name });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}