import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from '@heroicons/react/solid';
import { getUser } from "../../services/userService";
import Navbar from "../../components/dashboard/Navbar"
import UserProfile from "../../components/dashboard/UserProfile"
import PopUps from "../../components/dashboard/PopUps"

function Dashboard ({ cookies }) {
    const router = useRouter()

    // user states
    const [user, setUser] = useState()
    const [businessName, setBusinessName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [businessIndustry, setBusinessIndustry] = useState("Food & Beverage")
    const [businessSubindustry, setBusinessSubindustry] = useState("Coffee Shop")

    // popup states: placed as json objects
    const [popup1, setpopup1] = useState({
        header: "Allowed To Operate?", 
        value: "YES",
        title: "Allowed To Operate",
        body: "F&B establishments are only permitted to seat dine-in groups of up to 2 persons, i.e. a decrease from groups of up to 5 persons allowed previously. Vaccination-differentiated SMMs must continue to be applied to such dine-in groups or individuals."
    })
    const [popup2, setpopup2] = useState({
        header: "Contact Tracing", 
        value: "100% required", 
        title: "100% required", 
        body: "F&B establishments must implement SafeEntry via TraceTogether-only SafeEntry (TT-only SE) for dine-in customers and visitors"
    })
    const [popup3, setpopup3] = useState({
        header: "Group Size", 
        value: "2 PAX", 
        title: "Group Size: 2 Pax", 
        body: "As hawker centres and coffeeshops are open-air and naturally ventilated spaces, a special concession would be given to allow vaccinated and unvaccinated individuals to dine in these settings, but subject to group sizes of up to 2 persons only."
    })
    const [popup4, setpopup4] = useState({
        header: "Operating Capacity", 
        value: "100%",
        title: "Operating Capacity Determined By Layout", 
        body: "Where tables/seats are fixed, tables/seats should be marked out to accommodate groups of no more than 2 persons, while ensuring at least one-metre spacing between groups."
    })
    const [popup5, setpopup5] = useState({
        header: "Covid Testing",
        value: "Every 7 Days",
        title: "Swab Test Required Every 7 Days",
        body: "All individuals working at F&B establishments providing dine-in services (including part-time and full-time employees, third-party contracted staff must undergo testing once every 7 days using tests such as the antigen rapid test (ART) regardless of their vaccination status, under the regular Fast and Easy Test Rostered Routine Testing (FET RRT) regime. Individuals who have recovered from a COVID-19 infection in the past 270 days are exempted."
    })
    const [popup6, setpopup6] = useState({
        header: "Operating Guidelines",
        value: "By MOM",
        title: "Operating Guidelines",
        body: " F&B establishments must ensure that a safe distance of at least one metre is maintained between groups of up to 2 customers to mitigate the risk of transmission. This refers to the distance between the edges of every group or person. In addition, F&B establishments must ensure that the furniture is arranged in such a way to facilitate safe distancing between groups – for example, the distance measured between the backs of chairs used by customers in different groups, or the legs of chairs if there is no back, must also be at least one metre apart"
    })

    // this function sets all my states for this page
    async function setData() {
        if (!user) return
        setClientEmail(user.email)
        setBusinessName(user.registeredBusiness.businessName)
        // TODO: industry and sub industry

        // TODO: set popups
    }

    // this function gets the current authenticated user or redirects to login if not found
    const getAuthentication = async() => {
        if (user) return

        const userCookie = JSON.parse(cookies.user)
        const user_data = await getUser(userCookie.user_id, userCookie.refresh_token)
        setUser(user_data)
        if (!user_data) router.push('/login')
    }

    // this hook calls the function when the page loads and when user changes 
    useEffect(() => {
        getAuthentication()
        setData()
    }, [user])

    return (
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
                    <div className="flex items-end">
                        <span className="text-5xl font-bold">Hi</span>
                        <span className="text-4xl">,  WaterLoo Cai Fan</span>
                    </div>
                    <span className="text-gray-600">Welcome to your dashboard</span>
                    <span className="text-2xl mt-6">Safe Management Measures</span>
                    <span className="text-gray-600">for F&B Establishments - Coffeeshop as of 31 August 2021</span>
                </div>
                <div className="grid grid-flow-col lg:grid-cols-3 lg:grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-3">
                    <PopUps header={popup1.header} value={popup1.value} title={popup1.title} body={popup1.body}/>
                    <PopUps header={popup2.header} value={popup2.value} title={popup2.title} body={popup2.body}/>
                    <PopUps header={popup3.header} value={popup3.value} title={popup3.title} body={popup3.body}/>
                    <PopUps header={popup4.header} value={popup4.value} title={popup4.title} body={popup4.body}/>
                    <PopUps header={popup5.header} value={popup5.value} title={popup5.title} body={popup5.body}/>
                    <PopUps header={popup6.header} value={popup6.value} title={popup6.title} body={popup6.body}/>
                </div>
            </div>
            <UserProfile businessName={businessName} clientEmail={clientEmail} businessIndustry={businessIndustry} businessSubindustry={businessSubindustry} />
        </div>
    )
}

// this function fetches data from the server
// we use it to return the cookies data in Dashboard function props
export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}

export default Dashboard

