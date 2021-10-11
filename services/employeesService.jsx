import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

export async function getEmployees(businessId){
    if (!getInMemoryToken()) return null

    const employees = await axios.get('/api/v1/employeeRecord/all/' + businessId, {
        headers: {
            'Authorization': `Bearer ${getInMemoryToken()}`
        }
    })
    return employees.data
}

export function getEmployeeAge(employee) {
    return new Date().getFullYear() - new Date(employee.dateOfBirth).getFullYear()
}

export function getNumberOfVaccinatedEmployees(employeeArray) {
    var count = 0
    employeeArray.forEach(element => {
        if (element.vaccination != "UNVACCINATED") count++
    })
    return count
}

export async function addEmployee(name, dob, vaccination, lastSwabDate, swabResult, businessId) {
    if (!getInMemoryToken()) return null

    try {
        const res = await axios.post(`/api/v1/employeeRecord/add`, {
            "employeeName": name,
            "dateOfBirth": dob,
            "vaccine": vaccination,
            "lastSwabDate": lastSwabDate,
            "swabResult": swabResult,
            "businessId": businessId
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

export async function deleteEmployee(employeeId) {
    if (!getInMemoryToken()) return null

    try {
        const res = await axios.delete(`/api/v1/employeeRecord/` + employeeId, {
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
