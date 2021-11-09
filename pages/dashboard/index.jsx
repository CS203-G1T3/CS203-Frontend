import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CheckCircleIcon, CheckIcon, ClipboardIcon, EyeIcon, SearchIcon } from '@heroicons/react/solid';
import { getUser } from "../../services/userService";
import Navbar from "../../components/dashboard/Navbar"
import UserProfile from "../../components/dashboard/UserProfile"
import PopUps from "../../components/dashboard/PopUps"
import { getIndustry } from "../../services/industryService";
import { getLatestGuidelineByIndustry } from "../../services/guidelinesService";
import Head from "next/head";

function Dashboard ({ cookies }) {
    const router = useRouter()

    // user states
    const [user, setUser] = useState()
    const [businessName, setBusinessName] = useState("Waterloo Caifan")
    const [clientEmail, setClientEmail] = useState("waterloo@caifan.com")
    const [businessIndustry, setBusinessIndustry] = useState("Food & Beverage")
    const [businessSubindustry, setBusinessSubindustry] = useState("Coffee Shop")
    const [guidelineDate, setGuidelineDate] = useState("31 August 2021")


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

        const business = user.registeredBusiness
        setBusinessName(business.businessName)
        
        const industry = await getIndustry(business.industryId)
        setBusinessIndustry(industry.industryName)
        setBusinessSubindustry(industry.industrySubtype)

        const guideline = await getLatestGuidelineByIndustry(business.industryId)
        setGuidelineDate(new Date(guideline.createdAt).toDateString())
        setpopup1({header: "Allowed To Operate?", value: guideline.isCanOpOnSite ? "YES" : "NO", title: "Allowed To Operate? " + guideline.isCanOpOnSite, body: guideline.canOpOnSiteDetails})
        setpopup2({header: "Contact Tracing", value: guideline.contactTracing, title: "Contact Tracing: " + guideline.contactTracing, body: guideline.contactTracingDetails})
        setpopup3({header: "Group Size", value: guideline.groupSize + " PAX", title: "Group Size: " + guideline.groupSize + " PAX", body: guideline.groupSizeDetails})
        setpopup4({header: "Operating Capacity", value: guideline.opCapacity + "%", title: "Operating Capacity: " + guideline.opCapacity + "%", body: guideline.opCapacityDetails})
        setpopup5({header: "Covid Testing", value: guideline.covidTestingVaccinated + " DAYS", title: "Covid Testing: " + guideline.covidTestingVaccinated, body: guideline.covidTestingDetails})
        setpopup6({header: "Operating Guidelines", value: "BY MOM", title: "Operating Guidelines: Ministry of Manpower", body: guideline.opGuidelines})

    }

    // this function gets the current authenticated user or redirects to login if not found
    //COPY THIS
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
                <title>Dashboard</title>
            </Head>

            <Navbar businessName={businessName} clientEmail={clientEmail} />
            <div className="pt-8 pl-8 w-full">
                <div className="w-full flex">
                    <div className="flex w-96 px-2 border-2 rounded-lg items-center" >
                        <SearchIcon className="w-6 h-6 mx-2 m-1" />
                        <input className="w-full p-2" type="text" placeholder="Search"></input>
                    </div>
                </div>
                <div className="mt-6 mb-4 flex flex-col">
                    <div className="flex items-end">
                        <span className="text-3xl font-bold">Hello  {businessName}</span>
                    </div>
                    <span className="text-gray-400 text-lg">Welcome back !</span>
                </div>

                <div className="bg-yellow-50 rounded-lg p-8">
                    <div className="text-2xl">Safe Management Measures</div>
                    <div className="text-gray-600">for {businessIndustry} Establishments - {businessSubindustry} as of {guidelineDate}</div>

                    <div className="flex mt-8 justify-between">
                        <div className="flex flex-col justify-center">
                            <div className="bg-yellow-200 rounded-full w-10 h-10 flex items-center justify-center my-4">
                                <CheckIcon className="h-7" />
                            </div>
                            <PopUps header={popup1.header} value={popup1.value} title={popup1.title} body={popup1.body}/>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="bg-yellow-200 rounded-full w-10 h-10 flex items-center justify-center my-4">
                                <ClipboardIcon className="h-7" />
                            </div>
                            <PopUps header={popup2.header} value={popup2.value} title={popup2.title} body={popup2.body}/>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="bg-yellow-200 rounded-full w-10 h-10 flex items-center justify-center my-4">
                                <EyeIcon className="h-7" />
                            </div>
                            <PopUps header={popup5.header} value={popup5.value} title={popup5.title} body={popup5.body}/>
                        </div>
                    </div>
                </div>

                <div className="flex mt-4 w-full">
                    <div className="bg-red-50 p-8 rounded-lg w-full mr-2">
                        <div className="text-2xl mb-4">Operations</div>
                        <PopUps header={popup4.header} value={popup4.value} title={popup4.title} body={popup4.body}/>
                    </div>
                    <div className="bg-blue-50 p-8 rounded-lg w-full ml-2">
                        <div className="text-2xl mb-4">Social Gatherings</div>

                        <PopUps header={popup3.header} value={popup3.value} title={popup3.title} body={popup3.body}/>
                    </div>

                </div>

                <div className="pt-4 flex" >
                    <div className="mr-1">* Check the source of the information </div>
                    <PopUps header={"here"} value={""} title={""} body={popup6.body}/>
                </div>
            </div>
            
            <UserProfile businessName={businessName} clientEmail={clientEmail} businessIndustry={businessIndustry} businessSubindustry={businessSubindustry} />
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

export default Dashboard

