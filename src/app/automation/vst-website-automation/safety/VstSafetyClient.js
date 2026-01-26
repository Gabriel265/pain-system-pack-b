export default function VstSafetyClient() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header Space */}
      <div className="h-16 md:h-20"></div>
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        Safety Center
      </h1>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white  rounded-2xl p-8 border space-y-4">
          <div className="h-8 bg-gray-300  rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(4)].map((__, j) => (
              <div key={j} className="h-4 bg-gray-200  rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
