import axios from "axios";

export default axios.create({
  baseURL: process.env.URL,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
