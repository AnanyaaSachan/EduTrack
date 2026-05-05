// GET: Read and parse data from localStorage
export const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// SET: Stringify and save data to localStorage
export const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
