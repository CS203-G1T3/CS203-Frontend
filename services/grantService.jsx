import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

export async function getGrant(grantId){
    if (!getInMemoryToken()) return null

    const grant = await axios.get('api/v1/grant/' + grantId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return grant.data
}

export async function getAllGrantsByIndustry(industrySubtypeName){
    if (!getInMemoryToken()) return null

    const grants = await axios.get('/api/v1/grants/industry/' + industrySubtypeName, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return grants.data
}

