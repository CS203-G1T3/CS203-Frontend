import Navbar from "../../components/dashboard/Navbar"
import AdminUserProfile from "../../components/dashboard/AdminUserProfile"
import Graphs from "../../components/dashboard/Graphs"
import { SearchIcon } from '@heroicons/react/solid';

function AdminDashboard () {

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
                        <h3 className="text-3xl pl-3">Sally Tan Xiao Hui</h3>
                    </div>
                    <h4 className="text-gray-600">Welcome to your homepage</h4>
                </div>
                <h2 className="text-2xl m-8">Current Vaccination Rates Per Industry</h2>
                <div class="grid grid-flow-col lg:grid-cols-4 lg:grid-rows-1 gap-20 md:grid-cols-2 md:grid-rows-3 p-1 mb-4">
                    <Graphs industry="F&B" vaccinated="12,000" unvacccinated="100"/>
                    <Graphs industry="Retail"/>
                    <Graphs industry="Entertainment"/>
                    <Graphs industry="Office"/>
                </div>
                <h2 className="text-2xl m-5">Quicklinks</h2>
                <div class="grid grid-flow-col lg:grid-cols-3 lg:grid-rows-1 gap-20 md:grid-cols-2 md:grid-rows-3 ">
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
            <AdminUserProfile/>
            
        </div>
       
     )

}
    
export default AdminDashboard
