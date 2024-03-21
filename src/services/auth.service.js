import axios from "axios";

const api = axios.create({
    baseURL: process.env.URL,
    headers: {
        "content-type": "application/json",
    }
})

const login = async (userEmail, Userpassword) => {
    try {
        const res = await api.post("/login", {
            email: userEmail,
            password: Userpassword
        });
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userId", res.data.user.id)
        localStorage.setItem("userName", res.data.user.name)
        localStorage.setItem("userLastname", res.data.user.lastname)
        localStorage.setItem("userSpiritualName", res.data.user.spiritualName)
        localStorage.setItem("userRol", res.data.user.rol)
    } catch (error) {
        throw Error("Login fallido")
    }
}

export {login}