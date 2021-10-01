import { DownOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';


function UserProfile () {
    return (
        <div className = "flex flex-col justify-baseline w-1/5 h-full bg-gray-200">

             <button className="flex mt-4 m-2 items-center">
                <div className="h-16 w-16 p-1">
                    <img className="object-cover rounded-full h-full w-full" src="/hawker.webp" alt="profile_pic" />
                </div>
                <div className="text-indigo-500 font-bold text-sm">Waterloo Cai Fan</div>
                <DownOutlined className="w-4"/>
            </button>

            <div className="flex flex-col p-5 space-y-3 mt-8">
                <span className = "text-xl font-bold">Profile Details </span>
                <span className = "text-gray-500 flex flex-col">Industry <span className ="text-xl font-bold">Food & Beverage</span></span>
                <span className = "text-gray-500 flex flex-col">Sub-Industry <span className ="text-xl font-bold">Coffeeshop</span></span>
            </div>
            <div className="flex flex-col p-5 space-y-3 mt-8">
                <span className = "text-xl font-bold">Updates </span>
                <span className = "text-gray-500">You have no new updates</span>
            </div>
        </div>
    )
}

export default UserProfile