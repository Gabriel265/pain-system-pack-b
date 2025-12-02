export default function VSTHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-16 py-1">
     {/* Header Spacer */}
      <div className="h-8 md:h-10 lg:h-12"></div>
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">Welcome to VST</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {["Quick Search", "Interactive Map", "Safety Center"].map((title) => (
          <div key={title} className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-10 rounded-2xl text-center">
            <div className="bg-white/30 w-20 h-20 rounded-full mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="mt-4 opacity-90">Explore this feature</p>
          </div>
        ))}
      </div>
    </div>
  );
}