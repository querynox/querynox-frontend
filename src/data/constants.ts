const NODE_ENV = import.meta.env.MODE ||  "development";
export const BACKEND_HOST = NODE_ENV == "production" ? import.meta.env.BACKEND_HOST : "http://localhost:8080";
export const FRONTEND_HOST = NODE_ENV == "production" ? import.meta.env.FRONTEND_HOST : "http://localhost:5173";
export const SohamJoshiGithubLink = "https://github.com/sohamjoshi25";
export const Hackice20GithubLink = "https://github.com/hackice20";