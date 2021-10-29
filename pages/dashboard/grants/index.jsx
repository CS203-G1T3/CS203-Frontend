import { DownOutlined } from "@ant-design/icons"
import { Pagination } from 'antd';
import { SearchIcon, OfficeBuildingIcon, DocumentTextIcon } from "@heroicons/react/outline"
import { Breadcrumb } from 'antd';
import { useRouter } from "next/router"
import Link from 'next/link'
import { useEffect, useState } from "react"
import Navbar from "../../../components/dashboard/Navbar"
import { getUser } from "../../../services/userService"
import { getIndustry } from "../../../services/industryService";
import { getAllGrantsByIndustry } from "../../../services/grantService";


function Grants({cookies}) {

    const router = useRouter()

    const [user, setUser] = useState()
    const [businessName, setBusinessName] = useState()
    const [email, setEmail] = useState()
    const [industrySubtype, setIndustrySubtype] = useState("Tech")
    const [pageNum, setPageNum] = useState(1)
    
    const[grants, setGrants] = useState(
        [{
            id:1, 
            name: "Business Improvement Fund1", 
            provider: "Ministry Of Manpower", 
            desc: "The Business Improvement Fund (BIF) aims to encourage technology innovation and adoption, redesign of business model and processes in the tourism sector to improve productivity and competitiveness.",
            industry: "Tech",
            value: 1000
        }, 
        {
            id:2, 
            name: "Business Improvement Fund2", 
            provider: "Ministry Of Manpower", 
            desc: "The Business Improvement Fund (BIF) aims to encourage technology innovation and adoption, redesign of business model and processes in the tourism sector to improve productivity and competitiveness.",
            industry: "Tech",
            value: 1000
        }, 
        {
            id:3, 
            name: "Business Improvement Fund3", 
            provider: "Ministry Of Manpower", 
            desc: "The Business Improvement Fund (BIF) aims to encourage technology innovation and adoption, redesign of business model and processes in the tourism sector to improve productivity and competitiveness.",
            industry: "Tech",
            value: 1000
        },
        {
            id:4, 
            name: "Business Improvement Fund4", 
            provider: "Ministry Of Manpower", 
            desc: "The Business Improvement Fund (BIF) aims to encourage technology innovation and adoption, redesign of business model and processes in the tourism sector to improve productivity and competitiveness.",
            industry: "Tech",
            value: 1000
        }, 
        {
            id:2, 
            name: "Business Improvement Fund5", 
            provider: "Ministry Of Manpower", 
            desc: "The Business Improvement Fund (BIF) aims to encourage technology innovation and adoption, redesign of business model and processes in the tourism sector to improve productivity and competitiveness.",
            industry: "Tech",
            value: 1000
        }, 
        {
            id:3, 
            name: "Business Improvement Fund6", 
            provider: "Ministry Of Manpower", 
            desc: "The Business Improvement Fund (BIF) aims to encourage technology innovation and adoption, redesign of business model and processes in the tourism sector to improve productivity and competitiveness.",
            industry: "Tech",
            value: 1000
        }]
    )

    async function setData(){
        if (!user) return

        setBusinessName(user.registeredBusiness.businessName)
        setEmail(user.email)

        // set grant information
        const industry = await getIndustry(user.registeredBusiness.industryId)
        const industrySubtypeName = industry.industrySubtype
        setIndustrySubtype(industrySubtypeName)
        const grantsResponse = await getAllGrantsByIndustry(industrySubtypeName)

        const grantsArray = []
        grantsResponse.map((element,index) => {
            grantsArray.push({
                id: element.grantId,
                name: element.grantName,
                provider: element.provider,
                desc: element.grantDesc,
                industry: industrySubtypeName,
                value: element.value
            })
        })
        setGrants(grantsArray)

    }

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
        setData()
    }, [user])

    return (        
        <div className="flex bg-gray-50 min-h-screen">
            <Navbar />
            <div className="p-4 w-full">
                <div className="w-full flex justify-around items-center">
                    <div className="flex w-96 px-4 border-2 rounded-full bg-gray-200 items-center" >
                        <SearchIcon className="w-6 h-6 mx-2 m-1" />
                        <input className="bg-gray-200 w-full p-2" type="text" placeholder="Search"></input>
                    </div>

                    <button className="flex">
                        <div className="h-10 w-10 p-1">
                            <img className="object-cover rounded-lg h-full w-full" src="/hawker.webp" alt="profile_pic" />
                        </div>
                        <div className="flex flex-col text-left mx-2">
                            <div className="text-indigo-500 font-bold text-sm">{ businessName }</div>
                            <div className="text-gray-400 font-bold text-xs">{ email }</div>
                        </div>
                        <DownOutlined className="w-4 pt-1"/>
                        {/* TODO: add logout method */}
                    </button>
                </div>

                <div className="mx-8 mt-4 flex flex-col h-full">
                    <span className="text-2xl">Grants and Support</span>
                    <span className="text-gray-400 mb-2">View available grants to businesses of your industry</span>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>Grants & Support</Breadcrumb.Item>
                        <Breadcrumb.Item>{industrySubtype}</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="mt-4">
                        {grants.map((element, index) => {
                            if (index < (pageNum-1)*3 || index > pageNum * 3 -1) return

                            return (
                                <Link href={"/dashboard/grants/" + element.id} key={index}>
                                    <button className="flex bg-white rounded-lg p-4 mb-4 text-start w-full">
                                        <div className="h-32 w-32 bg-black">
                                            <img className="object-cover h-32 rounded-sm" src="/collaboration.jpeg" alt="grant photo" />
                                        </div>
                                        <div className="flex flex-col pl-8 w-3/5 text-left">
                                            <span className="font-bold text-lg">{element.name}</span>
                                            <span className="pt-2 text-gray-400">By {element.provider}</span>
                                            <span className="pt-2 text-gray-500">{element.desc}</span>
                                        </div>
                                        <div className="flex flex-col items-around">
                                            <div className="flex text-gray-400 m-4 items-center">
                                                <OfficeBuildingIcon className="w-6 h-6 mr-2"/>
                                                <span>{element.industry}</span>
                                            </div>
                                            <div className="flex text-gray-400 m-4 items-center">
                                                <DocumentTextIcon className="w-6 h-6 mr-2"/>
                                                <span>Up to ${element.value}</span>
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="mt-4">
                        <Pagination defaultCurrent={1} total={grants.length} pageSize={3}
                                    onChange={(value) => setPageNum(value)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Grants

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
