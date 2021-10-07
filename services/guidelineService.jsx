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

