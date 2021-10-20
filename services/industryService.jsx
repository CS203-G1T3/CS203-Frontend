import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

export async function getIndustry(industryId){
    if (!getInMemoryToken()) return null

    const industry = await axios.get('/api/v1/industry/' + industryId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return industry.data
}

export async function getAllIndustries(industryName) {
    if (!getInMemoryToken()) return null

    const industries = await axios.get('/api/v1/industrySubtypes' , {
        params: {industryName: industryName},
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return industries.data
}

export async function getAllIndustryNames() {
    if (!getInMemoryToken()) return null

    const industryNames = await axios.get('/api/v1/industryNames' , {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return industryNames.data
}
