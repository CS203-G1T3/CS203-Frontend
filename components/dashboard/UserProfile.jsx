import { DownOutlined } from '@ant-design/icons';

function UserProfile () {
    return (
        <div className = "flex flex-col justify-baseline w-1/5 h-full bg-indigo-50">

             <button className="flex mt-4 p-2">
                <div className="h-10 w-10 p-1">
                    <img className="object-cover rounded-lg h-full w-full" src="/hawker.webp" alt="profile_pic" />
                </div>
                <div className="flex flex-col text-left mx-2">
                    <div className="text-indigo-500 font-bold text-sm">Waterloo Cai Fan</div>
                    <div className="text-gray-400 font-bold text-xs">waterloo@caifan.com</div>
                </div>

                <DownOutlined className="w-4 pt-1"/>
            </button>

            <div className="flex flex-col p-5 space-y-3 mt-8">
                <span className = "text-xl font-bold">Profile Details </span>
                <span className = "text-gray-500 flex flex-col">Industry <span className ="text-2xl">Food & Beverage</span></span>
                <span className = "text-gray-500 flex flex-col">Sub-Industry <span className ="text-2xl">Coffeeshop</span></span>
            </div>
            <div className="flex flex-col p-5 space-y-3 mt-8">
                <span className = "text-xl font-bold">Updates </span>
                <span className = "text-gray-500">You have no new updates</span>
            </div>
        </div>
    )
}

export default UserProfile