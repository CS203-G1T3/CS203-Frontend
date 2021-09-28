import { DownOutlined } from '@ant-design/icons';

function AdminUserProfile () {
    return (
        <div className = "flex flex-col justify-baseline w-80 h-80">
             <button className="flex space-x-1 mt-4 p-5 items-center">

                <div className="h-auto w-20">
                    <img className="object-fill" src="/admin.png" alt="profile_pic"/>
                </div>

                <div className="client-details">
                    <div className="flex justify-between">
                        <p className="text-indigo-500 font-bold">Sally Tan</p>
                        <div className="w-4 flex items-center"> 
                            <DownOutlined/>
                        </div>
                    </div>
                    <p>sallytanxh@govt.com.sg</p>
                </div>
            </button>
        </div>
    )
}

export default AdminUserProfile