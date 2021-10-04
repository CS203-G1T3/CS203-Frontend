import Navbar from "../../components/admin/Navbar"
import { SearchIcon } from '@heroicons/react/solid';
import { DownOutlined } from '@ant-design/icons';

function AdminGuidelines() {

    async function handleSubmit() {

    }

    return ( <div className="flex h-screen">
        <Navbar/>
        <div className="p-4 w-full">
            <div className="w-full flex justify-around items-center">
                <div className="flex w-96 p-2 px-4 border-2 rounded-full bg-gray-200" >
                    <SearchIcon className="w-6 h-6 mx-2" />
                    <input className="bg-gray-200" type="text" placeholder="Search"></input>
                </div>
                <button className="flex">
                    <div className="h-10 w-10 p-1">
                        <img className="object-cover rounded-lg h-full w-full" src="/hawker.webp" alt="profile_pic" />
                    </div>
                    <div className="flex flex-col text-left mx-2">
                        <span className="text-indigo-500 font-bold text-sm">Admin User 01</span>
                        <span className="text-gray-400 font-bold text-xs">user@admin.com</span>
                    </div>
                    <DownOutlined className="w-4 pt-1"/>
                </button>
            </div>

            <div className="m-8 flex flex-col">
                <span className="text-2xl font-bold mt-8">Operating Guidelines</span>

                <table className="border-separate border border-black my-4">
                    <tr>
                        <th className="border border-black">ID</th>
                        <th className="border border-black">Industry ID</th>
                        <th className="border border-black">created at</th>
                        <th className="border border-black">can operate on site</th>
                        <th className="border border-black">can operate on site details</th>
                    </tr>
                    <tr>
                        <td className="border border-black">Alfreds Futterkiste</td>
                        <td className="border border-black">Maria Anders</td>
                        <td className="border border-black">Germany</td>
                        <td className="border border-black">Alfreds Futterkiste</td>
                        <td className="border border-black">Maria Anders</td>
                    </tr>
                    <tr>
                        <td className="border border-black">Alfreds Futterkiste</td>
                        <td className="border border-black">Maria Anders</td>
                        <td className="border border-black">Germany</td>
                        <td className="border border-black">Alfreds Futterkiste</td>
                        <td className="border border-black">Maria Anders</td>
                    </tr>
                    <tr>
                        <td className="border border-black">Alfreds Futterkiste</td>
                        <td className="border border-black">Maria Anders</td>
                        <td className="border border-black">Germany</td>
                        <td className="border border-black">Alfreds Futterkiste</td>
                        <td className="border border-black">Maria Anders</td>
                    </tr>
                    <tr>
                        <td className="border border-black">Alfreds Futterkiste</td>
                        <td className="border border-black">Maria Anders</td>
                        <td className="border border-black">Germany</td>
                        <td className="border border-black">Alfreds Futterkiste</td>
                        <td className="border border-black">Maria Anders</td>
                    </tr>
                </table>

                <span className="text-2xl font-bold">Create New Guideline</span>
                <form onSubmit={handleSubmit}>

                    <label>Name</label>
                    <input id="name" type="text" autoComplete="name" required />


                    <button className="bg-blue-200 p-1" type="submit">Create</button>
                </form>

            </div>

        </div>

    </div>
    )
}

export default AdminGuidelines