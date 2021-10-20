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

export async function getAllGuidelines(){
    if (!getInMemoryToken()) return null

    const guidelines = await axios.get('/api/v1/guidelines', {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return guidelines.data
}

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