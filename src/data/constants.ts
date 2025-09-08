export const NODE_ENV = (import.meta.env.MODE || "development") as string;

export const BACKEND_HOST = (NODE_ENV == "production" ? ( import.meta.env.VITE_BACKEND_HOST  || "https://backend.querynox.xyz" ) : "http://localhost:8080") as string;
export const FRONTEND_HOST =  (NODE_ENV == "production" ? ( import.meta.env.VITE_FRONTEND_HOST || "https://www.querynox.xyz" ) : "http://localhost:5173") as string;
export const SohamJoshiGithubLink = "https://github.com/sohamjoshi25" as string;
export const Hackice20GithubLink = "https://github.com/hackice20" as string;

export const PRO_PRODUCT_ID =  import.meta.env.VITE_PRO_PRODUCT_ID as string;