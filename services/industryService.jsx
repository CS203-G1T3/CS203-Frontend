import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

export async function getIndustry(industryId){
    if (!getInMemoryToken()) return null

    const industry = await axios.get('/api/v1/industry/id/' + industryId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return industry.data
}