import Navbar from "../../components/dashboard/Navbar"
import UserProfile from "../../components/dashboard/UserProfile"
import popUps from "./popups"
import { DownOutlined } from '@ant-design/icons';
import { SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link'
import DashboardCard from "../../components/dashboard/DashboardCard";
  

function Dashboard () {


    return (
        <div className="h-screen flex">
            <Navbar />
           
            
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

                    <DashboardCard header="Allowed To Operate?" value="YES" link="/" />
                    <DashboardCard header="Allowed To Operate?" value="YES" link="/" />
                    <DashboardCard header="Allowed To Operate?" value="YES" link="/" />
                    <DashboardCard header="Allowed To Operate?" value="YES" link="/" />
                    <DashboardCard header="Allowed To Operate?" value="YES" link="/" />
                    <DashboardCard header="Allowed To Operate?" value="YES" link="/" />




                {/* <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg" id="open-btn">
                    <p className="order-first">Allowed To Operate?</p>
                    <p className="order-second text-2xl font-bold">YES</p>
                    <a href="#" className="no-underline hover:underline text-gray-600 pt-9">Click here for more details</a>
   
                    
                </div>
                <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg" >
                    <p>Contact Tracing</p>
                    <p className="text-2xl font-bold">100% required <br></br> SAFE ENTRY</p>
                    <a href="#" className="no-underline hover:underline text-gray-600 pt-9">Click here for more details</a>
                </div>
                
                 <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg">
                    <p>Group Size</p>
                    <p className="text-2xl font-bold">2 PAX</p>
                    <a href="#" className="no-underline hover:underline text-gray-600 pt-9">Click here for more details</a>
                </div>
                <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg">
                    <p>Operating Capactiy</p>
                    <p className="text-2xl font-bold">100%</p>
                    <a href="#" className="no-underline hover:underline text-gray-600 pt-9">Click here for more details</a>
                </div>
                <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg">
                    <p>COVID-19 Swab Test Frequency</p>
                    <p className="text-2xl font-bold">Every 14 Days</p>
                    <a href="#" className="no-underline hover:underline text-gray-600 pt-9">Click here for more details</a>
                </div>
                <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg">
                    <p>Operating Guidelines</p>
                    <p className="text-2xl font-bold">By MOM</p>
                    <p className="text-xs">Ministry Of Manpower</p>
                    <a href="#" className="no-underline hover:underline text-gray-600 pt-9">Click here for more details</a>
                </div> */}
                
               
              
            
                </div>




            </div>
            <UserProfile />
            <popUps />
        </div>
    )

}

export default Dashboard