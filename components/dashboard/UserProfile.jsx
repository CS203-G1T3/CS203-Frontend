import { DownOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';


function UserProfile () {
    return (
        <div className = "flex flex-col justify-start w-80 h-full bg-gray-200">
             <div className="flex space-x-1 mt-4 p-5">
                <div><SmileOutlined /></div>
                <p>Waterloo Cai Fan waterloocaifan@hawker.com.sg</p>
                <div><DownOutlined /></div>
            </div>
            <div className="flex flex-col p-5 space-y-3">
                <p className = "text-4xl font-bold mt-20">Profile Details </p>
                <p className = "text-gray-500">Industry <p className ="text-2xl font-bold">Food & Beverage</p></p>
                <p className = "text-gray-500">Sub-Industry <p className ="text-2xl font-bold">Coffee Shop</p></p>
            </div>
            <div className="flex flex-col p-5 space-y-3">
                <p className = "text-4xl font-bold mt-20">Updates </p>
                <p className = "text-gray-500">You have no new updates</p>
            </div>
           
        </div>
        

       
    )
}

export default UserProfile