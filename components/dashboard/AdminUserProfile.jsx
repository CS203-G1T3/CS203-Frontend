import { DownOutlined } from '@ant-design/icons';
import { SearchIcon } from '@heroicons/react/solid';


function AdminUserProfile ({email}) {
    return (
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
                        <span className="text-indigo-500 font-bold text-sm">Admin User</span>
                        <span className="text-gray-400 font-bold text-xs">{email}</span>
                    </div>
                    <DownOutlined className="w-4 pt-1"/>
                </button>
            </div>
    )
}

export default AdminUserProfile