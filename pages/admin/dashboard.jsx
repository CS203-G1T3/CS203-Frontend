import Navbar from "../../components/admin/Navbar"
import LineChart from "../../components/admin/Graphs"
import { SearchIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import { useRouter } from "next/router";
import { getUser } from "../../services/userService";
import { useState, useEffect } from "react";
import {Tooltip} from 'antd';


function AdminDashboard (cookies) {
    const router = useRouter()

    const [user, setUser] = useState()
    const [email, setEmail] = useState()

    async function setData() {
        if (!user) return
        setEmail(user.email)

    }

    const getAuthentication = async() => {
        try {
            const userCookie = JSON.parse(cookies.cookies.user)
            const user_data = await getUser(userCookie.user_id, userCookie.refresh_token)
            if (!user_data) router.push('/admin/login')
            if (!user) setUser(user_data)   
        }
        catch {
            router.push('/admin/login')
        }
    }
    useEffect(() => {
        getAuthentication()
        setData()
    }, [user])
    
    return (
        <div className = "h-screen flex font-Inter">
            <Navbar email = {email}/>

            <div className="pt-8 pl-8 w-full">
                <div className="w-full flex">
                    <div className="flex w-96 px-2 border-2 rounded-lg items-center" >
                        <SearchIcon className="w-6 h-6 mx-2 m-1" />
                        <input className="w-full p-2" type="text" placeholder="Search"></input>
                    </div>
                </div>
                <div className="mt-6 mb-4 flex flex-col">
                    <div className="flex items-end">
                        <span className="text-3xl font-bold">Hello Ruwan,</span>
                    </div>
                    <span className="text-gray-400 text-lg">Welcome back !</span>
                </div>
                

                
                <div className="flex mt-4 mb-8 w-full flex-direction: column ">

                    <div className="bg-red-50 p-8 rounded-lg w-full mr-10">
                        <div className="text-2xl mb-4">Updates</div>
                        <div>  <Tooltip placement="bottom" title= "Action Required"> <ExclamationCircleIcon className="w-5 h-5"/> </Tooltip> There has been changes to the COVID-19 guidelines for Food & Beverage - Hawker Center. Please refer to the latest copy of the <a href="https://www.nea.gov.sg/media/news/advisories/index/enhanced-safe-management-measures-at-hawker-centres-and-coffeeshops"  target="_blank"> NEA guideline</a> and update accordingly. </div>
                    </div>

                    <div className="bg-yellow-50 p-8 rounded-lg w-full mr-10">
                    <h2 className="text-2xl m-4">Current Vaccination Rates Per Industry</h2>
                    <div className="w-full"><LineChart/></div>

                </div>
                </div>

                <div className="bg-green-50 p-8 rounded-lg mr-9 mb-9">

                <h2 className="text-2xl">Quicklinks</h2>
                <div className="grid grid-flow-col lg:grid-cols-3 lg:grid-rows-1 gap-20 md:grid-cols-2 md:grid-rows-3 ">
                    <div className="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg p-4">
                            <h2 className="text-xl">COVID-19 Guidelines</h2>
                            <a href="#">View Guidelines</a>
                            <a href="#">Update Guidelines</a>
                    </div>
                    <div className="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg p-4">
                            <h2 className="text-xl">Risk Management Questionnaire</h2>
                            <a href="#">View Results</a>
                            <a href="#">Edit Questionnaire</a>
                    </div>
                    <div className="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg p-4">
                            <h2 className="text-xl">Grants & Support</h2>
                            <a href="#">View Schemes</a>
                            <a href="#">Edit Information</a>
                    </div>

                </div>
            </div>
        </div>
            
        </div>
       
     )

}
    
export default AdminDashboard

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
