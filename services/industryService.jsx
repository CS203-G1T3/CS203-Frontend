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

export async function getAllIndustries(token){
    if (!getInMemoryToken()) return null

    const getAllIndustryNames = await axios.get('/api/v1/industryNames/' + token, {
        headers:{
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    }).then(res => {
        // res.map(resIndx => {
        //     //shallow copying
        //     setIndustries(...industries, resIndx)
        // })
        const nameOfIndustries = getAllIndustryNames.data.industryName
        console.log(nameOfIndustries)
        setIndustries(nameOfIndustries)

    })
    .catch(error => console.error(`Error: ${error}`))
}