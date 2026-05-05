import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group border border-gray-100"
    >
      {/* Thumbnail */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">

        {/* Category Badge */}
        <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${
          course.category === "Frontend"
            ? "bg-blue-50 text-blue-600"
            : course.category === "Backend"
            ? "bg-purple-50 text-purple-600"
            : course.category === "Programming"
            ? "bg-green-50 text-green-600"
            : course.category === "Database"
            ? "bg-orange-50 text-orange-600"
            : course.category === "DevOps"
            ? "bg-gray-100 text-gray-600"
            : "bg-blue-50 text-blue-600"
        }`}>
          {course.category}
        </span>

        {/* Title */}
        <h3 className="text-gray-800 font-bold text-base leading-snug line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-gray-500 text-sm">
          👨‍🏫 {course.instructor}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-400 font-bold">⭐ {course.rating}</span>
          <span className="text-gray-400">({course.reviewsCount.toLocaleString()} reviews)</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-auto pt-3 flex items-center justify-between">
          {/* Level */}
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            course.level === "Beginner"
              ? "bg-green-50 text-green-600"
              : course.level === "Intermediate"
              ? "bg-yellow-50 text-yellow-600"
              : "bg-red-50 text-red-500"
          }`}>
            {course.level}
          </span>

          {/* Price */}
          <span className="text-blue-700 font-extrabold text-base">
            ₹{course.price}
          </span>
        </div>

      </div>
    </Link>
  );
}

export default CourseCard;
