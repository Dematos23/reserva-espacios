import axios from "axios";

const api = axios.create({
    baseURL: process.env.URL,
    headers: {
        "content-type": "application/json",
    }
})

const login = async (userEmail, Userpassword) => {
    try {
        const res = await axios.post("/login",{
            email: userEmail,
            password: Userpassword
        })
        localStorage.setItem("token", res.data.token)
    } catch (error) {
        
    }
}