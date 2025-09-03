const NODE_ENV = import.meta.env.NODE_ENV
export const BACKEND_HOST = NODE_ENV == "production" ? "http://localhost:8080" : "";
export const FRONTEND_HOST = NODE_ENV == "production" ? "http://localhost:5173" : "https://querynox.xyz";
export const SohamJoshiGithubLink = "https://github.com/sohamjoshi25";
export const Hackice20GithubLink = "https://github.com/hackice20";