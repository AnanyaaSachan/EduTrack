function FilterBar({
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory,
  selectedLevel, setSelectedLevel,
  categories, levels,
  onReset, isFiltered, resultCount, totalCount,
}) {
  return (
    <div className="flex flex-col gap-4 mb-8">

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Search input */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition"
          />
        </div>

        {/* Category dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm cursor-pointer transition"
        >
          <option value="All" className="text-gray-400">— All Categories —</option>
          {categories.filter(c => c !== "All").map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Level dropdown */}
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm cursor-pointer transition"
        >
          <option value="All" className="text-gray-400">— All Levels —</option>
          {levels.filter(l => l !== "All").map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>

        {/* Reset button — only show when filters are active */}
        {isFiltered && (
          <button
            onClick={onReset}
            className="px-4 py-2.5 border-2 border-blue-200 text-blue-600 font-semibold rounded-xl text-sm hover:bg-blue-50 transition-all duration-200 whitespace-nowrap"
          >
            ✕ Reset Filters
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-700">{resultCount}</span> of{" "}
        <span className="font-semibold text-gray-700">{totalCount}</span> courses
      </p>

    </div>
  );
}

export default FilterBar;
