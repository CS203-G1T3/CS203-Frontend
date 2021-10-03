import Navbar from "../../components/dashboard/Navbar"
import UserProfile from "../../components/dashboard/UserProfile"
import { SearchIcon } from '@heroicons/react/solid';
import PopUps from "../../components/dashboard/PopUps"

function Dashboard () {

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

                    <PopUps header="Allowed To Operate?" value="YES" title="Allowed To Operate" body="F&B establishments are only permitted to seat dine-in groups of up to 2 persons, i.e. a decrease from groups of up to 5 persons allowed previously. Vaccination-differentiated SMMs must continue to be applied to such dine-in groups or individuals."/>
                    <PopUps header="Contact Tracing" value="100% required" title="100% required" body="F&B establishments must implement SafeEntry via TraceTogether-only SafeEntry (TT-only SE) for dine-in customers and visitors"/>
                    <PopUps header="Group Size" value="2 PAX" title="Group Size: 2 Pax" body="As hawker centres and coffeeshops are open-air and naturally ventilated spaces, a special concession would be given to allow vaccinated and unvaccinated individuals to dine in these settings, but subject to group sizes of up to 2 persons only."/>
                    <PopUps header="Operating Capacity" value="100%" title="Operating Capacity Determined By Layout" body="Where tables/seats are fixed, tables/seats should be marked out to accommodate groups of no more than 2 persons, while ensuring at least one-metre spacing between groups."/>
                    <PopUps header="Covid Testing" value="Every 7 Days" title="Swab Test Required Every 7 Days" body="All individuals working at F&B establishments providing dine-in services (including part-time and full-time employees, third-party contracted staff must undergo testing once every 7 days using tests such as the antigen rapid test (ART) regardless of their vaccination status, under the regular Fast and Easy Test Rostered Routine Testing (FET RRT) regime. Individuals who have recovered from a COVID-19 infection in the past 270 days are exempted."/>
                    <PopUps header="Operating Guidelines" value="By MOM" title="Operating Guidelines" body=" F&B establishments must ensure that a safe distance of at least one metre is maintained between groups of up to 2 customers to mitigate the risk of transmission. This refers to the distance between the edges of every group or person. In addition, F&B establishments must ensure that the furniture is arranged in such a way to facilitate safe distancing between groups – for example, the distance measured between the backs of chairs used by customers in different groups, or the legs of chairs if there is no back, must also be at least one metre apart"/>

                </div>

            
            </div>
            <UserProfile />

        </div>
    )

}

export default Dashboard