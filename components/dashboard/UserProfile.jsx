import { DownOutlined } from '@ant-design/icons';

function UserProfile ({businessName, clientEmail, businessIndustry, businessSubindustry}) {
    return (
        <div className = "w-1/5 bg-black m-8 rounded-lg font-Inter text-white">

            <div className="flex flex-col p-5 space-y-3">
                <span className = "text-lg font-bold">Profile Details </span>
                <span className = "text-gray-500 flex flex-col">Industry <span className ="text-xl text-white">{businessIndustry}</span></span>
                <span className = "flex flex-col text-gray-500">Sub-Industry <span className ="text-xl text-white">{businessSubindustry}</span></span>
            </div>
            <div className="flex flex-col p-5 space-y-3 mt-8">
                <span className = "text-lg font-bold">Updates </span>
                <span className = "text-gray-500">You have no new updates</span>
            </div>
        </div>
    )
}

export default UserProfile