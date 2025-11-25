export default function Filters({ dateRange, setDateRange, category, setCategory }) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-card rounded-xl p-5 shadow-lg border border-border">
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="bg-card border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
      >
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-card border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
      >
        <option value="all">All Categories</option>
        <option value="service">Accommodations</option>
        <option value="service">Car Hire</option>
        <option value="service">Tours</option>
      </select>
    </div>
  );
}