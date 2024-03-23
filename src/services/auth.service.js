import axios from "axios";

const api = axios.create({
    baseURL: process.env.URL,
    headers: {
        "content-type": "application/json",
    }
})

const serviceLogin = async (userEmail, userPassword) => {
    try {
      
        

        // const res = await api.post("/login", {
        //     "email": userEmail,
        //     "password": userPassword
        // });

        const res = await api.get("/", {
            "email": userEmail,
            "password": userPassword
        });
        console.log(res.data);
        // localStorage.setItem("token", res.data.token)
        // localStorage.setItem("userId", res.data.user.id)
        // localStorage.setItem("userName", res.data.user.name)
        // localStorage.setItem("userLastname", res.data.user.lastname)
        // localStorage.setItem("userSpiritualName", res.data.user.spiritualName)
        // localStorage.setItem("userRol", res.data.user.rol)
    } catch (error) {
        throw Error("Login fallido")
    }
}

const test = async () => {
    try {
        const res = await axios.get(process.env.URL).
            then(res => {
                console.log(res);
            })
    } catch (error) {
        
    }
}

export {serviceLogin, test}