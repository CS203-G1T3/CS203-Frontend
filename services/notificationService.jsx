import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

export async function getAllNotifications(clientId){
    if (!getInMemoryToken()) return null

    const notif = await axios.get('api/v1/notifications/' + clientId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return notif.data
}

export async function getAllUnackedknowledgedNotifications(clientId){
    if (!getInMemoryToken()) return null

    const notif = await axios.get('api/v1/unack-notification/' + clientId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return notif.data
}


export async function putAcknowledgeNotification(notifId){
    if (!getInMemoryToken()) return null

    const notif = await axios.put('/api/v1/ack-notification/' + notifId, {}, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return notif.data
}

