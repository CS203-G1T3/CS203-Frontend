import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from '@heroicons/react/solid';
import { getUser } from "../../services/userService";
import Navbar from "../../components/dashboard/Navbar"
import Head from "next/head";
import { Table, Space } from 'antd';
import { getAllNotifications, getAllUnackedknowledgedNotifications, putAcknowledgeNotification } from "../../services/notificationService";
import { getRiskScore, riskRating } from "../../services/riskService";


function Risk ({ cookies }) {
    const router = useRouter()
    const { Column, ColumnGroup } = Table;


    // user states
    const [user, setUser] = useState()
    const [businessName, setBusinessName] = useState("")
    const [clientEmail, setClientEmail] = useState("")

    const [overallRisk, setOverallRisk] = useState(1)
    const [industryRisk, setIndustryRisk] = useState(3)
    const [testingRisk, setTestingRisk] = useState(1)
    const [vaccinationRisk, setVaccinationRisk] = useState(1)
    const [ageRisk, setAgeRisk] = useState(1)



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };
    
    // this function sets all my states for this page
    async function setData() {
        if (!user) return

        setBusinessName(user.registeredBusiness.businessName)
        setClientEmail(user.email)

        const riskRes = await getRiskScore(user.registeredBusiness.businessId)
        setIndustryRisk(riskRes.IndustryExposure)
        setVaccinationRisk(riskRes.VaccinationRisk)
        setTestingRisk(riskRes.CovidTestingRisk)
        setAgeRisk(riskRes.AverageAgeRisk)
        setOverallRisk(Math.round((riskRes.IndustryExposure + riskRes.VaccinationRisk + riskRes.CovidTestingRisk + riskRes.AverageAgeRisk)/4))

    }

    // this function gets the current authenticated user or redirects to login if not found
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

    // this hook calls the function when the page loads and when user changes 
    useEffect(() => {
        getAuthentication()
        setData()
    }, [user])

    return (
        <div className="h-screen flex font-Inter">
            <Head>
                <title>Alerts</title>
            </Head>

            <Navbar businessName={businessName} clientEmail={clientEmail} />
            <div className="pt-8 px-8 w-full">
                <div className="w-full flex">
                    <div className="flex w-96 px-2 border-2 rounded-lg items-center" >
                        <SearchIcon className="w-6 h-6 mx-2 m-1" />
                        <input className="w-full p-2" type="text" placeholder="Search"></input>
                    </div>
                </div>

                <div className="pr-4 mt-8 flex flex-col">
                    <div className="text-2xl">Risk Assessment</div>
                    <div className="text-gray-400">Manage your business covid risk with our key risk indicators</div>

                    <div className="border-2 rounded-lg p-4 mt-4">
                        <div className="px-4 border-b-2 flex py-4 flex items-center">
                            <span className="text-xl mr-4">Overall Risk Level</span>
                            <div className={overallRisk <= 2 ? "bg-green-500 p-1 px-3 rounded-full text-white text-xs" : "bg-red-500 p-1 px-3 rounded-full text-white text-xs"}>
                                {riskRating(overallRisk)}
                            </div>
                        </div>
                        <div className="flex flex-col p-4">
                            <span className="text-xl font-bold mb-4">Key Risk Indicators</span>

                            <table className="table-fixed p-4">
                                <thead>
                                    <tr className="text-gray-400 bg-gray-200 border-2">
                                    <th className="w-1/3 p-3">Indicator</th>
                                    <th className="w-1/3">Assessed Threat Level</th>
                                    <th className="">Risk Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="p-2"></td></tr>

                                    <tr className="border-2">
                                    <td className="text-lg text-center p-3">Industry Exposure</td>
                                    <td className="text-lg text-center justify-center">
                                        <span className={industryRisk <= 2 ? "bg-green-500 p-1 px-3 rounded-full text-white text-xs w-24" : "bg-red-500 p-1 px-3 rounded-full text-white text-xs w-24"}>
                                            {riskRating(industryRisk)}
                                        </span>
                                    </td>
                                    <td className="text-lg text-center">{industryRisk}</td>
                                    </tr>

                                    <tr className="border-2">
                                    <td className="text-lg text-center p-3">Vaccination Rate</td>
                                    <td className="text-lg text-center justify-center">
                                        <span className={vaccinationRisk <= 2 ? "bg-green-500 p-1 px-3 rounded-full text-white text-xs" : "bg-red-500 p-1 px-3 rounded-full text-white text-xs"}>
                                            {riskRating(vaccinationRisk)}
                                        </span>
                                    </td>
                                    <td className="text-lg text-center">{vaccinationRisk}</td>                                    </tr>

                                    <tr className="border-2">
                                    <td className="text-lg text-center p-3">Covid Testing Frequency</td>
                                    <td className="text-lg text-center justify-center">
                                        <span className={testingRisk <= 2 ? "bg-green-500 p-1 px-3 rounded-full text-white text-xs" : "bg-red-500 p-1 px-3 rounded-full text-white text-xs"}>
                                            {riskRating(testingRisk)}
                                        </span>
                                    </td>
                                    <td className="text-lg text-center">{testingRisk}</td>                                    </tr>

                                    <tr className="border-2">
                                    <td className="text-lg text-center p-3">Average Employee Age</td>
                                    <td className="text-lg text-center justify-center">
                                        <span className={ageRisk <= 2 ? "bg-green-500 p-1 px-3 rounded-full text-white text-xs" : "bg-red-500 p-1 px-3 rounded-full text-white text-xs"}>
                                            {riskRating(ageRisk)}
                                        </span>
                                    </td>
                                    <td className="text-lg text-center">{ageRisk}</td>                                    </tr>
                                </tbody>
                                </table>
                        </div>
                    </div>

                    <div className="m-8 text-gray-400">
                        *This risk score has been generated by your governing administrator, taking into account a robust framework of risk analysis.
                    </div>
                </div>

            </div>
            
        </div>
    )
}

// this function fetches data from the server
// we use it to return the cookies data in Dashboard function props
//put on every page that uses cookies
export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}

export default Risk

