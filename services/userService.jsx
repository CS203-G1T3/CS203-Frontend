import axios from "axios"
import { getInMemoryToken, silentRefresh } from "../utils/auth"

export async function getUser(userId, refresh_token){
    if(!userId || !refresh_token) return null

    if (!getInMemoryToken()) {
        await silentRefresh(refresh_token)
        if (!getInMemoryToken) return null
    }
    const user = await axios.get('/api/v1/client/' + userId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return user.data
}

export async function addUser(email, password, roles) {

    try {
        const res = await axios.post(`/api/v1/client`, {
            "email": email,
            "password": password,
            "roles": roles,
        })
        return res
    } 
    catch (e) {
        console.log(e);
    }
}
