import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import useAuth from "../hooks/useAuth";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

function Dashboard({ enrollments, progress, onLoadEnrollments }) {
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      onLoadEnrollments(user._id);
    }
  }, [user]);

  // Extract courses from enrollments
  const myCourses = enrollments
    .map((e) => e.courseId)
    .filter(Boolean);

  // Stats
  const totalCourses = myCourses.length;
  const completedCourses = myCourses.filter((c) => {
    const key = String(c._id);
    const completed = progress[key]?.length || 0;
    return completed === c.modules.length && c.modules.length > 0;
  }).length;
  const overallProgress = totalCourses > 0
    ? Math.floor(
        myCourses.reduce((sum, c) => {
          const key = String(c._id);
          const completed = progress[key]?.length || 0;
          const total = c.modules.length;
          return sum + (total > 0 ? (completed / total) * 100 : 0);
        }, 0) / totalCourses
      )
    : 0;
  const totalHours = myCourses.reduce((sum, c) => {
    const hrs = parseFloat(c.duration);
    return sum + (isNaN(hrs) ? 0 : hrs);
  }, 0);

  const stats = [
    { icon: "📊", label: "Total Courses", value: totalCourses, color: "text-blue-600", bg: "bg-blue-50" },
    { icon: "✅", label: "Completed", value: completedCourses, color: "text-green-600", bg: "bg-green-50" },
    { icon: "📈", label: "Overall Progress", value: `${overallProgress}%`, color: "text-purple-600", bg: "bg-purple-50" },
    { icon: "⏱", label: "Total Hours", value: `${totalHours} hrs`, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen page-transition">

      {/* ── WELCOME SECTION ── */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <p className="text-blue-200 text-sm">{today}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Welcome back, {user?.name || "Learner"} 👋
          </h1>
          <p className="text-blue-100 text-base mt-1">
            Continue your learning journey — every step counts! 🚀
          </p>
          <p className="text-blue-200 text-sm italic mt-1">
            "Every expert was once a beginner."
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">

        {/* ── STATS ── */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-lg transition-all duration-300">
                <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center text-xl`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium">{stat.label}</p>
                  <p className={`text-2xl font-extrabold ${stat.color} mt-0.5`}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MY LEARNING ── */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-gray-800">My Learning</h2>
            <p className="text-gray-500 text-sm mt-1">Pick up where you left off</p>
            <div className="mt-2 w-14 h-1 bg-blue-600 rounded-full" />
          </div>

          {myCourses.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-5xl mb-4">📚</p>
              <p className="text-lg font-semibold">No courses enrolled yet</p>
              <p className="text-sm mt-1">Go to <Link to="/" className="text-blue-500 hover:underline">Home</Link> and enroll in a course!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {myCourses.map((course) => {
                const completedCount = progress[String(course._id)]?.length || 0;
                const totalCount = course.modules.length;
                const progressPercent = totalCount > 0
                  ? Math.floor((completedCount / totalCount) * 100)
                  : 0;

                return (
                  <div key={course._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group">
                    <div className="w-full h-44 overflow-hidden relative">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {progressPercent === 100 && (
                        <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">✅ Completed</span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          course.category === "Frontend" ? "bg-blue-50 text-blue-600"
                          : course.category === "Backend" ? "bg-purple-50 text-purple-600"
                          : course.category === "Programming" ? "bg-green-50 text-green-600"
                          : course.category === "Database" ? "bg-orange-50 text-orange-600"
                          : "bg-gray-100 text-gray-600"
                        }`}>{course.category}</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          course.level === "Beginner" ? "bg-green-50 text-green-600"
                          : course.level === "Intermediate" ? "bg-yellow-50 text-yellow-600"
                          : "bg-red-50 text-red-500"
                        }`}>{course.level}</span>
                      </div>

                      <h3 className="text-gray-800 font-bold text-base leading-snug line-clamp-2">{course.title}</h3>
                      <p className="text-gray-500 text-sm">👨‍🏫 {course.instructor}</p>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-gray-500 font-medium">Progress</span>
                          <span className="text-xs font-bold text-blue-600">{progressPercent}%</span>
                        </div>
                        <ProgressBar progress={progressPercent} />
                        <p className="text-xs text-gray-400 mt-1">{completedCount}/{totalCount} modules</p>
                      </div>

                      <Link
                        to={`/courses/${course._id}`}
                        className="mt-2 w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        {progressPercent === 0 ? "Start Learning" : progressPercent === 100 ? "Review Course" : "Continue Learning →"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Dashboard;
