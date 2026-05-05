import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import FilterBar from "../components/FilterBar";
import { fetchCourses } from "../services/api";

function Home({ enrolledCourses = [] }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Filter state ──
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  // ── Fetch courses from backend ──
  useEffect(() => {
    fetchCourses()
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ── Dynamic categories + levels from fetched data ──
  const categories = ["All", ...new Set(courses.map((c) => c.category))];
  const levels = ["All", ...new Set(courses.map((c) => c.level))];

  // ── Single filter pass ──
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // ── Reset filters ──
  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
  };

  const isFiltered =
    searchQuery !== "" || selectedCategory !== "All" || selectedLevel !== "All";

  return (
    <div className="bg-gray-50 min-h-screen page-transition">

      {/* ── HERO SECTION ── */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Track Your <span className="text-cyan-300">Learning Journey</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-xl">
            Explore top courses, track your progress, and level up your skills — all in one place.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="#courses"
              className="bg-white text-blue-800 font-bold px-7 py-3 rounded-full shadow-md hover:bg-cyan-100 hover:shadow-lg transition-all duration-300"
            >
              Explore Courses
            </a>
            <Link
              to="/signup"
              className="border-2 border-white/60 text-white/90 font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ── COURSES SECTION ── */}
      <section id="courses" className="py-20 px-6 mt-6">
        <div className="max-w-7xl mx-auto">

          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-800">All Courses</h2>
            <p className="text-gray-500 mt-2 text-base">
              Pick a course and start learning today
            </p>
            <div className="mt-3 mx-auto w-16 h-1 bg-blue-600 rounded-full" />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">⏳</p>
              <p className="text-lg font-semibold">Loading courses...</p>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-20 text-red-400">
              <p className="text-4xl mb-3">⚠️</p>
              <p className="text-lg font-semibold">Failed to load courses</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Courses */}
          {!loading && !error && (
            <>
              <FilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                categories={categories}
                levels={levels}
                onReset={handleReset}
                isFiltered={isFiltered}
                resultCount={filteredCourses.length}
                totalCount={courses.length}
              />

              {filteredCourses.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center gap-3">
                  <span className="text-5xl">😕</span>
                  <p className="text-xl font-bold text-gray-700">No courses found</p>
                  <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                  <button
                    onClick={handleReset}
                    className="mt-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-full text-sm hover:bg-blue-700 transition-all duration-200"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      isEnrolled={enrolledCourses.includes(course._id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </section>

    </div>
  );
}

export default Home;
