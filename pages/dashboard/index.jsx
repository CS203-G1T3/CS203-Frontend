import Navbar from "../../components/dashboard/Navbar"
import UserProfile from "../../components/dashboard/UserProfile"
import { SearchIcon } from '@heroicons/react/solid';
import DashboardCard from "../../components/dashboard/DashboardCard";
import PopUps from "../../components/dashboard/PopUps"

function Dashboard () {

    return (
        <div className="h-screen flex">
            <Navbar />
            <PopUps />
            
            <div className="p-4 w-full">
                {/* search bar and language */}
                <div className="w-full flex justify-around">
                    <div className="flex w-96 p-2 px-4 border-2 rounded-full bg-gray-200" >
                        <SearchIcon className="w-6 h-6 mx-2" />
                        <input className="bg-gray-200" type="text" placeholder="Search"></input>
                    </div>
                </div>

                <div className="m-8 flex flex-col">
                    <div className="flex items-end">
                        <h1 className="text-5xl font-bold">Hi,</h1>
                        <h3 className="text-3xl pl-3">WaterLoo Cai Fan</h3>
                    </div>

                    <h4 className="text-gray-600">Welcome to your homepage</h4>
                    <h2 className="text-3xl mt-4">Safe Management Measures</h2>
                    <h2 className="text-gray-600">for F&B Establishments - Coffeeshop as of 31 August 2021</h2>
                </div>

                <div class="grid grid-flow-col lg:grid-cols-3 lg:grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-3">

                    <DashboardCard header="Allowed To Operate?" value="YES" link="#" />
                    <DashboardCard header="Contact Tracing" value="100% required SAFE ENTRY" link="#" />
                    <DashboardCard header="Group Size" value="2 PAX" link="#" />
                    <DashboardCard header="Operating Capacity" value="100%" link="#" />
                    <DashboardCard header="COVID-19 Swab Test Frequency" value="Every 14 Days" link="#" />
                    <DashboardCard header="Operating Guidelines" value="By MOM" link="#" />

                </div>

            
            </div>
            <UserProfile />


        </div>
    )

}

export default Dashboard