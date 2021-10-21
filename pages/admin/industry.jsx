import IndustryForm from '../../components/admin/IndustryForm';
import { useState, useEffect } from "react";
import { getUser } from "../../services/userService"
import { useRouter } from "next/router";



function AdminIndustry( cookies ){
    
    const [user, setUser] = useState()
    const router = useRouter()
    var userSet = new Boolean (false)

    const getAuthentication = async() => {
        try {
            const userCookie = JSON.parse(cookies.cookies.user)
            const user_data = await getUser(userCookie.user_id, userCookie.refresh_token)
            if (!user_data) router.push('/admin/login')
            if (!user) setUser(user_data)    
            console.log(user)
        }
        catch(e) {
            console.log(e);
            router.push('/login')
        }
    }
    useEffect(() => {
        getAuthentication()
    }, [user])

    while (userSet == false){
        if (user){
            userSet = true
            return(
                //issue: user.clientId is run even before setUser is completed 
                <div>
        
                    <IndustryForm  adminId = {user.clientId} />
                   
                
                </div>
            )
        } else {
            getAuthentication()
            userSet = true
        
        }
    }
    
}
   

export default AdminIndustry

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}

