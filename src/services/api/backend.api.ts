import axios from "axios";

let token 
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    "content-type": "application/json",
    common: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export { backendApi };
