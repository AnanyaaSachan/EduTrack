import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import courses from "../data/courses";
import ProgressBar from "../components/ProgressBar";

function CourseDetails() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === parseInt(id));

  // Local state for module completion
  const [modules, setModules] = useState(course?.modules || []);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Course not found.
      </div>
    );
  }

  const isEnrolled = course.isEnrolled;

  // Toggle module completion (only if enrolled)
  const toggleModule = (moduleId) => {
    if (!isEnrolled) return;
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, completed: !m.completed } : m
      )
    );
  };

  // Calculate progress (only relevant if enrolled)
  const completedCount = modules.filter((m) => m.completed).length;
  const totalCount = modules.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="bg-gray-50 min-h-screen page-transition">

      {/* ── COURSE HEADER ── */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left: Course Info */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full w-fit">
              {course.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {course.title}
            </h1>
            <p className="text-blue-100 text-base leading-relaxed">
              {course.description}
            </p>
            <p className="text-white/80 text-sm font-medium">
              👨‍🏫 Instructor: <span className="text-white font-semibold">{course.instructor}</span>
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-yellow-300 font-bold text-base">⭐ {course.rating}</span>
              <span className="text-blue-200">({course.reviewsCount.toLocaleString()} reviews)</span>
              <span className="text-blue-200">•</span>
              <span className="text-blue-200">{course.duration}</span>
              <span className="text-blue-200">•</span>
              <span className="text-blue-200">{course.level}</span>
            </div>
          </div>

          {/* Right: Thumbnail */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-video w-full">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-contain bg-white"
            />
          </div>

        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT SIDE — Modules List ── */}
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
              Course Modules
              {/* Only show completion count if enrolled */}
              {isEnrolled && (
                <span className="ml-3 text-sm font-medium text-gray-400">
                  ({completedCount}/{totalCount} completed)
                </span>
              )}
            </h2>

            <div className="flex flex-col gap-3">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  onClick={() => toggleModule(module.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border select-none transition-all duration-200 ${
                    isEnrolled
                      ? module.completed
                        ? "bg-green-50 border-green-200 hover:bg-green-100 cursor-pointer"
                        : "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-200 cursor-pointer"
                      : "bg-white border-gray-200 cursor-default opacity-80"
                  }`}
                >
                  {/* Checkbox / Lock icon */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isEnrolled
                      ? module.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-100"
                  }`}>
                    {isEnrolled && module.completed && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {!isEnrolled && (
                      <span className="text-gray-400 text-xs">🔒</span>
                    )}
                  </div>

                  {/* Module number */}
                  <span className="text-gray-400 text-sm font-medium w-6 flex-shrink-0">
                    {index + 1}.
                  </span>

                  {/* Module title */}
                  <span className={`text-sm font-semibold flex-1 transition-all duration-200 ${
                    isEnrolled && module.completed
                      ? "text-green-700 line-through"
                      : "text-gray-700"
                  }`}>
                    {module.title}
                  </span>

                  {/* Status badge — only if enrolled */}
                  {isEnrolled && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                      module.completed
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {module.completed ? "Done" : "Pending"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDE — Summary Panel ── */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24 flex flex-col gap-5">

              {/* ENROLLED: Show progress */}
              {isEnrolled ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">Your Progress</span>
                    <span className="text-sm font-extrabold text-blue-600">{progressPercent}%</span>
                  </div>
                  <ProgressBar progress={progressPercent} />
                  <p className="text-xs text-gray-400 mt-1.5">
                    {completedCount} of {totalCount} modules completed
                  </p>
                </div>
              ) : (
                /* NOT ENROLLED: Show price prominently */
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-1">Course Price</p>
                  <span className="text-3xl font-extrabold text-gray-800">₹{course.price}</span>
                  <span className="text-gray-400 text-sm ml-1">one-time</span>
                </div>
              )}

              <div className="border-t border-gray-100" />

              {/* CTA Button */}
              <button className={`w-full font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                isEnrolled
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}>
                {isEnrolled
                  ? progressPercent > 0 ? "Continue Learning" : "Start Learning"
                  : "Enroll Now"}
              </button>

              <div className="border-t border-gray-100" />

              {/* Course Info */}
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">⏱ Duration</span>
                  <span className="font-semibold text-gray-700">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">📊 Level</span>
                  <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                    course.level === "Beginner"
                      ? "bg-green-50 text-green-600"
                      : course.level === "Intermediate"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-red-50 text-red-500"
                  }`}>
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">📚 Modules</span>
                  <span className="font-semibold text-gray-700">{totalCount} lessons</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">⭐ Rating</span>
                  <span className="font-semibold text-gray-700">{course.rating} / 5</span>
                </div>
                {/* Show price in info section only if enrolled */}
                {isEnrolled && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">💰 Price Paid</span>
                    <span className="font-semibold text-gray-700">₹{course.price}</span>
                  </div>
                )}
              </div>

              <Link
                to="/"
                className="text-center text-sm text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200 mt-1"
              >
                ← Back to all courses
              </Link>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default CourseDetails;
