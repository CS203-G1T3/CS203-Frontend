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