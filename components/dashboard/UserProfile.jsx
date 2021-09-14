import { DownOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';


function UserProfile () {
    return (
        <div className = "flex flex-col justify-baseline w-80 h-full bg-gray-200">
             <button className="flex space-x-1 mt-4 p-5 items-center">

                <div className="bg-black-500 h-full w-48 rounded-sm">
                    <img className="object-fill" src="/hawker.webp" alt="profile_pic" />
                </div>



                <div className="client-details">
                    <div className="flex justify-between">
                        <p className="text-blue-500 font-bold">Waterloo Cai Fan</p>
                        <div className="w-4 flex items-center"> 
                            <DownOutlined/>
                        </div>
                    </div>
                    <p>waterloocaifan@hawker.com.sg</p>
                </div>

            </button>

            <div className="flex flex-col p-5 space-y-3">

                <p className = "text-3xl font-bold mt-20">Profile Details </p>
                <p className = "text-gray-500 flex flex-col">Industry <span className ="text-2xl font-bold">Food & Beverage</span></p>
                <p className = "text-gray-500 flex flex-col">Sub-Industry <span className ="text-2xl font-bold">Coffeeshop</span></p>
                
            </div>
            <div className="flex flex-col p-5 space-y-3">
                <p className = "text-3xl font-bold mt-20">Updates </p>
                <p className = "text-gray-500">You have no new updates</p>
            </div>
           
        </div>
        

       
    )
}

export default UserProfile