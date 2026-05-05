const courses = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, state, and props.',
    instructor: 'Jane Doe',
    duration: '8 hours',
    level: 'Beginner',
    thumbnail: '',
    modules: [
      { id: 1, title: 'Getting Started', completed: false },
      { id: 2, title: 'Components & Props', completed: false },
      { id: 3, title: 'State & Lifecycle', completed: false },
      { id: 4, title: 'Hooks', completed: false },
    ],
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    description: 'Master core JavaScript concepts from variables to async programming.',
    instructor: 'John Smith',
    duration: '12 hours',
    level: 'Beginner',
    thumbnail: '',
    modules: [
      { id: 1, title: 'Variables & Data Types', completed: false },
      { id: 2, title: 'Functions', completed: false },
      { id: 3, title: 'Arrays & Objects', completed: false },
      { id: 4, title: 'Async JavaScript', completed: false },
    ],
  },
];

export default courses;
