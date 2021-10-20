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

export async function addBusiness(businessName, businessDesc, industryId, clientId) {
    if (!getInMemoryToken()) return null

    try {
        const res = await axios.post(`/api/v1/registered-business`, {
            "businessName": businessName,
            "businessDesc": businessDesc,
            "industryId": industryId,
            "clientId": clientId
        }, {
            headers: {
                'Authorization': `Bearer ${getInMemoryToken()}`
            }
        })
        return res
    } 
    catch (e) {
        console.log(e);
    }
}