import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

export async function getBusiness(businessId){
    if (!getInMemoryToken()) return null

    const business = await axios.get('/api/v1/registered-business/' + businessId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return business.data
}