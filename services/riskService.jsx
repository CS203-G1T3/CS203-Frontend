import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

export async function getRiskScore(businessId){
    if (!getInMemoryToken()) return null

    const riskScore = await axios.get('api/v1/risk-analysis-summary/' + businessId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return riskScore.data
}

// calculate risk rating
export const riskRating = (score) => {
    switch (score) {
        case 1:
            return "VERY LOW"
        case 2:
            return "LOW"
        case 3:
            return "MODERATE"
        case 4:
            return "HIGH"
        case 5:
            return "SEVERELY HIGH"
        default:
            return
    }
}




