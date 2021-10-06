import axios from "axios"

let inMemoryToken = null

// call this function when we do not have inMemoryToken
export async function silentRefresh(refresh_token) {
    const response = await axios.get('/api/v1/token/refresh/', {
        headers: {
            'Authorization': `Bearer ${refresh_token}`
        }
    })
    setInMemoryToken(response.data.access_token)
}

export function getInMemoryToken() {
    return inMemoryToken
}

export function setInMemoryToken(access_token) {
    inMemoryToken = access_token
}
