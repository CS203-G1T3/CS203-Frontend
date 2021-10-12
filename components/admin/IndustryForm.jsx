import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getUser } from "../../../services/userService"


function IndustryForm() {
    const router = useRouter()
    const [user, setUser] = useState()
    const { Option } = Select;

    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     const res = await addIndustry(event.industryDesc, event.industry, event.subIndustry)
    //     if (res) router.push('/dashboard/industry')
    // }
    
   
    

    const [value, setValue] = useState({
        industryDesc:'',
        industry: '',
        subIndustry:''
    })  

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaW5zeWhlbjk5QGdtYWlsLmNvbSIsInJvbGVzIjpbIkFETUlOIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvbG9naW4iLCJleHAiOjE2MzM3MTExMjh9.i__FLLLpHTtkpwaEpzE2p5cVX408WrEqVO5uGmPn_Qk';

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (industryDesc && industry && subIndustry){
            axios.post('/api/v1/industry/add/cf6c5cae-0a21-4ef3-a071-6b4ab029bdb7',{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            },value)
            .then(res => console.log(res.data.industryId))
            .catch(error => console.error(`Error: ${error}`));
        }

    }

    const handleChange = (event) => {
        setValue({
            industryDesc:event.target.value,
            industry: event.target.value,
            subIndustry: event.target.value
        })
    }



    const getAuthentication = async() => {

        try {
            const userCookie = JSON.parse(cookies.cookies.user)
            const user_data = await getUser(userCookie.user_id, userCookie.refresh_token)
            if (!user_data) router.push('/login')
            if (!user) setUser(user_data)    
        }
        catch(e) {
            console.log(e);
            router.push('/login')
        }
    }
    useEffect(() => {
        getAuthentication()
    }, [user])



    return(
        <form onSubmit = {handleSubmit} className="shadow-xl bg-purple-50 rounded-lg p-4">
            <div className="grid grid-flow-col lg:grid-cols-1 lg:grid-rows-2">
                <div className="grid grid-flow-row">
                <div>
                    <label htmlFor="industry">Please enter industry: </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" placeholder="E.g. Entertainment" id="industry" type="text" name="industry" onChange={handleChange}/><br></br>
                </div>
                <div>
                    <label htmlFor="operationDetails">Please enter sub-industry: </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" placeholder="E.g. Indoor" id="subIndustry" type="text" name="subindustry" onChange={handleChange}/><br></br>
                </div>
                </div>
                <div>
                    <label htmlFor="industryDesc">Description of sub-industry: </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" placeholder="E.g. YOLO" id="industryDesc" type="text" name="industryDesc"onChange={handleChange}/><br></br>
                </div>
                <div className="grid place-content-end mt-20">
                            <button className="shadow bg-indigo-700 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                SUBMIT
                            </button>
                </div>
            </div>
    </form>
)
}

export default IndustryForm

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
