import Navbar from "../../components/dashboard/Navbar"
import { DownOutlined } from '@ant-design/icons';
import { SearchIcon } from '@heroicons/react/solid';
  

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

                    <h4 className="text-gray-400">Welcome to your homepage</h4>
                    <h2 className="text-2xl mt-4">Safe Management Measures</h2>
                </div>




            </div>
        </div>
    )

}

export default Dashboard