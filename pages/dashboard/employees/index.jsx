import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { SearchIcon } from '@heroicons/react/solid'
import { PlusCircleIcon } from "@heroicons/react/solid"
import { Statistic, Table, Space} from 'antd'
import { getUser } from "../../../services/userService"
import Navbar from "../../../components/dashboard/Navbar"
import VaccinationChart from "../../../components/dashboard/VaccinationChart"
import { deleteEmployee, getEmployeeAge, getEmployees, getNumberOfVaccinatedEmployees } from "../../../services/employeesService"

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
  
function Employees({ cookies }) {
    const router = useRouter()
    const { Column, ColumnGroup } = Table;

    const [user, setUser] = useState()
    const [businessName, setBusinessName] = useState()
    const [email, setEmail] = useState()
    const [employees, setEmployees] = useState([{ key: 0, id:"1", name: 'John', age: 32, vaccinationStatus: 'PFIZER', lastSwab: '10 Oct 2021', lastSwabResult: 'NEGATIVE' }])
    const [numEmployees, setNumEmployees] = useState(28)
    const [numVaccinatedEmployees, setNumVaccinatedEmployees] = useState(16)
    const [vaccinationRate, setVaccinationRate] = useState("58%")

    async function setData(){
        if (!user) return

        setBusinessName(user.registeredBusiness.businessName)
        setEmail(user.email)

        const businessId = user.registeredBusiness.businessId        
        const employeeRecords = await getEmployees(businessId)
        const employeeArray = []
        employeeRecords.forEach((element, index) => {employeeArray.push({key: index, id: element.employeeId, name: element.employeeName, age: getEmployeeAge(element), vaccinationStatus: element.vaccine, lastSwab: element.lastSwabDate, lastSwabResult: element.swabResult})})
        setEmployees(employeeArray)

        setNumEmployees(employeeArray.length)
        setNumVaccinatedEmployees(getNumberOfVaccinatedEmployees(employeeArray))

        employeeArray.length > 0 ? setVaccinationRate((getNumberOfVaccinatedEmployees(employeeArray)/employeeArray.length*100).toFixed() + "%") : setVaccinationRate("NA")
    }

    const getAuthentication = async() => {
        try {
            const userCookie = JSON.parse(cookies.user)
            const user_data = await getUser(userCookie.user_id, userCookie.refresh_token)
            if (!user_data) router.push('/login')
            if (!user) setUser(user_data)    
        }
        catch {
            router.push('/login')
        }
    }
    useEffect(() => {
        getAuthentication()
        setData()
    }, [user])

    return(
        <div className="flex h-screen font-Inter">
            <Head>
                <title>Employee Management</title>
            </Head>

            <Navbar businessName={businessName} clientEmail={email} />
            <div className="pt-8 pl-8 w-full">
                <div className="w-full flex">
                    <div className="flex w-96 px-2 border-2 rounded-lg items-center" >
                        <SearchIcon className="w-6 h-6 mx-2 m-1" />
                        <input className="w-full p-2" type="text" placeholder="Search"></input>
                    </div>
                </div>

                <div className="pr-4 mt-8 flex flex-col">
                    <div className="text-2xl">Employee Management</div>
                    <div className="text-gray-400">View and manage all employees under the company.</div>


                    <div className="flex mt-4 w-full h-56">
                        <div className="w-full mr-3">
                            <span className="text-xl">Overview</span>
                            <div className="flex justify-between mt-2 h-full">
                                <div className="bg-blue-50 p-4 rounded-lg w-1/3 mr-2">
                                    <Statistic title="Number of employees" value={numEmployees} />
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg w-1/3 mx-2">
                                    <Statistic title="Total number vaccinated" value={numVaccinatedEmployees} />
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg w-1/3 ml-1">
                                    <Statistic title="Vaccination Rate" value={vaccinationRate} />
                                </div>
                            </div>
                        </div>

                        <div className="w-144 ml-3">
                            <span className="text-xl">Headcount</span>
                            <div className="bg-red-50 rounded-lg mt-2 p-4 h-full">
                                <span className=""></span>
                                <VaccinationChart currentNum={numEmployees} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-12">
                        <div className="flex items-center">
                            <span className="text-xl">Employees</span>

                            <a href="/dashboard/employees/add" className="ml-4 flex items-center">add new employee <PlusCircleIcon className="h-4 ml-1" /></a>
                        </div>

                        <Table dataSource={employees} rowSelection={{type: 'checkbox', ...rowSelection,}} pagination = {{defaultPageSize:5}}>
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column title="Age" dataIndex="age" key="age" />
                            <Column title="Vaccination Status" dataIndex="vaccinationStatus" key="vaccinationStatus" />
                            <Column title="Last Swab" dataIndex="lastSwab" key="lastSwab" />
                            <Column title="Last Swab Result" dataIndex="lastSwabResult" key="lastSwabResult" />

                            <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                <button className="text-blue-500 hover:text-blue-300" onClick={async() => {
                                                                                                           router.reload(window.location.pathname
                                                                                                           )}}>View</button>
                                <button className="text-blue-500 hover:text-blue-300" onClick={async() => {
                                                                                                           router.reload(window.location.pathname
                                                                                                           )}}>Edit</button>
                                <button className="text-blue-500 hover:text-blue-300" onClick={async() => {deleteEmployee(record.id)
                                                                                                           router.reload(window.location.pathname
                                                                                                           )}}>Delete</button>
                                </Space>
                            )}          
                            />
                        </Table>
                    </div>
                </div>
            </div>
        </div>    
        )
}

export default Employees

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
