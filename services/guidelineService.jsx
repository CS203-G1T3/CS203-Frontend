import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

export async function getLatestGuidelineByIndustry(industryId){
    if (!getInMemoryToken()) return null

    const guideline = await axios.get('/api/v1/guideline/byIndustry/' + industryId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return guideline.data
}

// export async function addGuideline(name, dob, vaccination, lastSwabDate, swabResult, businessId) {
//     if (!getInMemoryToken()) return null

//     try {
//         const res = await axios.post(`/api/v1/employeeRecord/add`, {
//             "employeeName": name,
//             "dateOfBirth": dob,
//             "vaccine": vaccination,
//             "lastSwabDate": lastSwabDate,
//             "swabResult": swabResult,
//             "businessId": businessId
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${getInMemoryToken()}`
//             }
//         })
//         return res
//     } 
//     catch (e) {
//         console.log(e);
//     }
// }
