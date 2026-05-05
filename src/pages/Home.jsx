import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import courses from "../data/courses";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── HERO SECTION ── */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Track Your <span className="text-cyan-300">Learning Journey</span>
          </h1>

          {/* Description */}
          <p className="text-blue-100 text-lg md:text-xl max-w-xl">
            Explore top courses, track your progress, and level up your skills — all in one place.
          </p>

          {/* CTA Buttons */}
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-800">
              All Courses
            </h2>
            <p className="text-gray-500 mt-2 text-base">
              Pick a course and start learning today
            </p>
            <div className="mt-3 mx-auto w-16 h-1 bg-blue-600 rounded-full" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
