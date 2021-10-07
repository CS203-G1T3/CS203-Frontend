import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from '@heroicons/react/solid';
import { getUser } from "../../../services/userService";
import Navbar from "../../../components/dashboard/Navbar"


function Employees({ cookies }) {
    const router = useRouter()
    const [user, setUser] = useState()

    const getAuthentication = async() => {
        try {
            const userCookie = JSON.parse(cookies.user)
            const user_data = await getUser(userCookie.user_id, userCookie.refresh_token)
            if (!user_data) router.push('/login')
            if (!user) setUser(user_data)    
        }
        catch {
            router.push('/login')
        }
    }
    useEffect(() => {
        getAuthentication()
    }, [user])



    return(
        <div className="h-screen flex">
            <Navbar />
            <div className="p-4 w-full">
                <div className="w-full flex justify-around">
                    <div className="flex w-96 p-2 px-4 border-2 rounded-full bg-gray-200" >
                        <SearchIcon className="w-6 h-6 mx-2" />
                        <input className="bg-gray-200" type="text" placeholder="Search"></input>
                    </div>
                </div>

                <div className="mx-8 mt-8 mb-4 flex flex-col">
                    <span className="text-4xl">Employee Management</span>

                    <div>
                        
                    </div>
                </div>
            </div>
        </div>    
        )
}

export default Employees

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
