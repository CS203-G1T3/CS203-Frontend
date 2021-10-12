import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

// const addGuideline = async event => {
//     event.preventDefault()

//     const guideline = {
//         option: state.option
//     };


//         axios.post('http://localhost:8080/api/v1/guideline/add' + userId, {
//           guideline
//         }, {
//           headers: {
//             'Authorization': `Bearer ${getInMemoryToken()}` 
//           }
//         })
//         .then(res => {
//             res.map(resIndx => {
//                 //shallow copying
//                 setIndustries(...industries, resIndx)
//             })
//             console.log(res)
//             console.log(res.data)
//         })
//   }


export async function addGuideline(clientId, industryId, isCanOpOnSite, canOpOnSiteDetails, groupSize, groupSizeDetails, covidTestingVaccinated, covidTestingUnvaccinated, covidTestingDetails, contactTracing, contactTracingDetails, opCapacity, opCapacityDetails, opGuidelines, referenceLink) {
    if (!getInMemoryToken()) return null

    try {
        const res = await axios.post(`/api/v1/guideline/add/` + clientId, {
            "industryId": industryId,
            "isCanOpOnSite": isCanOpOnSite,
            "canOpOnSiteDetails": canOpOnSiteDetails,
            "groupSize": groupSize,
            "groupSizeDetails": groupSizeDetails,
            "covidTestingVaccinated": covidTestingVaccinated,
            "covidTestingUnvaccinated": covidTestingUnvaccinated,
            "covidTestingDetails": covidTestingDetails,
            "contactTracing": contactTracing,
            "contactTracingDetails": contactTracingDetails,
            "opCapacity": opCapacity,
            "opCapacityDetails": opCapacityDetails,
            "opGuidelines": opGuidelines,
            "referenceLink": referenceLink,
        }, {
            headers: {
                'Authorization': `Bearer ${getInMemoryToken()}`
            }
        })
        return res
    } 
    catch (e) {
        console.log(e);
        console.log(getInMemoryToken())
    }
}