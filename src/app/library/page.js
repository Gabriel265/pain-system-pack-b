// src/app/library/page.js

export default function LibraryPage() {
  const skeletons = [
    { title: 'Website Skeleton', description: 'A basic structure for a website.' },
    { title: 'Tool Skeleton', description: 'A basic structure for a tool.' },
    { title: 'Portal Skeleton', description: 'A basic structure for a portal.' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Skeleton Templates Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skeletons.map((skeleton, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{skeleton.title}</h2>
            <p className="text-gray-600">{skeleton.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
