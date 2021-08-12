import { API_URL } from "./config.js";

export const state = {
  userInfo: {
    query: "",
  },
  sugge: [
    "front-end developer",
    "back-end developer",
    "developer",
    "engineer",
    "backend",
    "web developer",
    "digital marketing",
    "marketing manager",
    "marketing",
    "sales",
    "writing",
    "aws",
    "sales manager",
    "usa",
    "europe",
    "designer",
    "javascript",
    "vue",
    "full stack",
    "full stack engineer",
    "full stack developer",
    "software development",
    "human resources",
    "devops",
    "finance",
    "data",
    "react",
    "react native",
    "python",
    "customer support",
  ],
  favorites: {},
  results: [],
  categories: [],
};

export async function onLoad() {
  try {
    const fetching = await fetch(`${API_URL}?limit=100`);
    const res = await fetching.json();
    state.results = res.jobs;
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
}
export async function onSearch(query) {
  try {
    const fetching = await fetch(`${API_URL}?search=${query}`);
    state.userInfo.query = query;
    const res = await fetching.json();

    state.results = res.jobs;
  } catch (err) {
    // Temp error handling
    console.error(`💥💥💥💥`);
  }
}

// get all categories on load
(async () => {
  try {
    const fetching = await fetch(`${API_URL}/categories`);
    const res = await fetching.json();
    state.categories = res.jobs;
  } catch (err) {
    // Temp error handling
    console.error(`💥💥💥💥`);
  }
})();
