import Navbar from "../../components/dashboard/Navbar"
import UserProfile from "../../components/dashboard/UserProfile"
import { DownOutlined } from '@ant-design/icons';
import { SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link'
  

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
                    <button className="flex justify-around items-center rounded-full p-2 px-8 bg-gray-200">
                        English
                        <DownOutlined />
                    </button>
                </div>

                <div className="m-8 flex flex-col">
                    <div className="flex items-end">
                        <h1 className="text-6xl font-bold">Hi,</h1>
                        <h3 className="text-4xl pl-3">WaterLoo Cai Fan</h3>
                    </div>

                    <h4 className="text-gray-600">Welcome to your homepage</h4>
                    <h2 className="text-4xl mt-4">Safe Management Measures</h2>
                    <h2 className="text-gray-600">for F&B Establishments - Coffeeshop as of 31 August 2021</h2>
                </div>

                <div class="grid grid-flow-col grid-cols-3 grid-rows-2 gap-4">
                <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4">
                    <p className="order-first">Allowed To Operate?</p>
                    <p className="order-second text-2xl font-bold">YES</p>
                    <Link href = "#">
                        <p className="order-last text-gray-600 pt-9">Click here for more details</p>
                    </Link>
                    
                </div>
                <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4">
                    <p>Contact Tracing</p>
                    <p className="text-2xl font-bold">100% required <br></br> SAFE ENTRY</p>
                    <p className="text-gray-600 pt-9">Click here for more details</p>
                </div>
                 <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4">
                    <p>Group Size</p>
                    <p className="text-2xl font-bold">2 PAX</p>
                    <p className="text-gray-600 pt-9">Click here for more details</p>
                </div>
                <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4">
                    <p>Operating Capactiy</p>
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-gray-600 pt-9">Click here for more details</p>
                </div>
                <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4">
                    <p>COVID-19 Swab Test Frequency</p>
                    <p className="text-2xl font-bold">Every 14 Days</p>
                    <p className="text-gray-600 pt-9">Click here for more details</p>
                </div>
                <div class="flex flex-col items-baseline shadow-xl h-50 w-60 m-4">
                    <p>Operating Guidelines</p>
                    <p className="text-2xl font-bold">By MOM</p>
                    <p className="text-xs">Ministry Of Manpower</p>
                    <p className="text-gray-600 pt-9">Click here for more details</p>
                </div>
                
               
              
            
                </div>




            </div>
            <UserProfile />
        </div>
    )

}

export default Dashboard