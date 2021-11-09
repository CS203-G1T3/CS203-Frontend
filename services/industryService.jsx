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

export async function addIndustry(adminId, industryName, subIndustryName, industryDesc) {
    if (!getInMemoryToken()) return null

    try {
        const res = await axios.post(`/api/v1/industry/` + adminId, {
            "industryName": industryName,
            "industrySubtype": subIndustryName,
            "industryDesc": industryDesc,
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

export async function editIndustry(adminId, industryId, industryName, subIndustry, industryDesc) {
    if (!getInMemoryToken()) return null

    console.log("service" + industryDesc)

    try {
        const res = await axios.put(`/api/v1/industry/` + adminId, {
            "industryId": industryId,
            "industryName": industryName,
            "industrySubtype": subIndustry,
            "industryDesc": industryDesc,
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

export async function deleteIndustry(adminId, industryId){
    if (!getInMemoryToken()) return null

    try{
        const res = await axios.delete('/api/v1/industry/' + adminId + '/' + industryId, {
            headers: {
                'Authorization': `Bearer ${getInMemoryToken()}`
            }
        })
        return res
    }

    catch (e) {
        console.log(e)
        console.log(getInMemoryToken())
    }

}