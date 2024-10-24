import axios from 'axios'


export const loginAdmin = async (email: string,password:string) => {
    return await axios.post("http://localhost:3010/api/login", {
        email,
        password,
    });
};
