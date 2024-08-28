import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "content-type": "application/json",
  },
});

const serviceLogin = async (userEmail, userPassword) => {
  const userData = {
    email: userEmail,
    password: userPassword,
  };
  try {
    const res = await api.post("/login", userData);
    return res;
  } catch (error) {
    throw Error("Login fallido");
  }
};

const test = async (userEmail, userPassword) => {
  console.log(process.env);
  const userData = {
    email: userEmail,
    password: userPassword,
  };
  try {
    const res = await axios.post("https://jyotir-43f0e2c5b921.herokuapp.com/login", userData);
    return res;
  } catch (error) {}
};

export { serviceLogin, test };
