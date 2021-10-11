import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

// TODO: integrate with backend - currently down 
export async function getIndustry(industryId){
    if (!getInMemoryToken()) return null

    const industry = await axios.get('/api/v1/registered-business/' + businessId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return business.data
}

export async function getAllIndustries(){
    if (!getInMemoryToken()) return null

    const industryNames = await axios.get('/api/v1/industryNames/', {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    
    return industryNames.data
}