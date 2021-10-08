import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { SearchIcon } from '@heroicons/react/solid'
import { Statistic, Row, Col, Button } from 'antd'
import { getUser } from "../../../services/userService"
import Navbar from "../../../components/dashboard/Navbar"
import VaccinationChart from "../../../components/dashboard/VaccinationChart"


function Employees({ cookies }) {
    const router = useRouter()
    const [user, setUser] = useState()

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
    }, [user])



    return(
        <div className="h-screen flex">
            <Navbar />
            <div className="p-4 w-full">
                <div className="w-full flex justify-around">
                    <div className="flex w-96 p-2 px-4 border-2 rounded-full bg-gray-200" >
                        <SearchIcon className="w-6 h-6 mx-2" />
                        <input className="bg-gray-200" type="text" placeholder="Search"></input>
                    </div>
                </div>

                <div className="mx-8 mt-8 mb-4 flex flex-col">
                    <span className="text-2xl">Employee Management</span>

                    <div className="flex mt-4 w-full h-56">
                        <div className="w-full mr-3">
                            <span className="text-xl">Overview</span>
                            <div className="bg-gray-50 rounded-lg mt-2 p-4 h-full">
                                <Row gutter={16}>
                                    <Col span={12}>
                                    <Statistic title="Number of employees" value={2432} />
                                    </Col>
                                    <Col span={12}>
                                    <Statistic title="Total number vaccinated" value={134} />
                                    <Button style={{ marginTop: 16 }} type="primary">
                                        See breakdown
                                    </Button>
                                    </Col>
                                    <Col span={12}>
                                    <Statistic title="Active Users" value={112893} />
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className="w-144 ml-3 h-full p-1">
                            <span className="text-xl">Vaccination Rate</span>
                            <div className="bg-gray-50 rounded-lg mt-2 p-2 h-full">
                                <span className=""></span>
                                <VaccinationChart />
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full mt-14">
                        <span className="text-xl">Employees</span>

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
