import { useRouter } from 'next/router'
import { DownOutlined } from "@ant-design/icons"
import { Pagination } from 'antd';
import { SearchIcon, OfficeBuildingIcon, DocumentTextIcon } from "@heroicons/react/outline"
import { Breadcrumb } from 'antd';
import Link from 'next/link'
import { useEffect, useState } from "react"
import Navbar from "../../../components/dashboard/Navbar"
import { getUser } from "../../../services/userService"
import { getGrant } from '../../../services/grantService';
import { getIndustry } from '../../../services/industryService';

const Grant = ({cookies}) => {
    const router = useRouter()
    const { id } = router.query

    const [user, setUser] = useState()
    const [businessName, setBusinessName] = useState()
    const [email, setEmail] = useState()
    const [industrySubtype, setIndustrySubtype] = useState("Tech")

    // grant data
    const [grantName, setGrantName] = useState("Business Improvement Grant")
    const [grantProvider, setGrantProvider] = useState("Ministry Of Manpower")
    const [grantDesc, setGrantDesc] = useState("The Business Improvement Fund (BIF) aims to encourage technology innovation and adoption, redesign of business model and processes in the tourism sector to improve productivity and competitiveness.")
    const [grantEligibility, setGrantEligibility] = useState("The BIF is open to all Singapore-registered businesses/companies embarking on projects with a clear tourism focus.")
    const [grantApplication, setGrantApplication] = useState("Interested applicants are advised to declare if they are SME or non-SME and provide an executive summary of the proposed project to STB_Incentives@stb.gov.sg.")
    const [grantBenefits, setGrantBenefits] = useState("Grants will be disbursed to successful applicants on a reimbursement basis, subject to achievement of the agreed project deliverables and milestones. Applicants are required to submit third-party audited documents on qualifying costs for the disbursement of grants, unless otherwise stated.​")
    const [grantLink, setGrantLink] = useState("https://www.stb.gov.sg/content/stb/en/assistance-and-licensing/grants-overview/business-improvement-fund-bif.html")


    async function setData(){
        if (!user) return

        setBusinessName(user.registeredBusiness.businessName)
        setEmail(user.email)

        const industry = await getIndustry(user.registeredBusiness.industryId)
        const industrySubtypeName = industry.industrySubtype
        setIndustrySubtype(industrySubtypeName)

        const grantResponse = await getGrant(id)
        setGrantName(grantResponse.grantName)
        setGrantProvider(grantResponse.provider)
        setGrantDesc(grantResponse.grantDesc)
        setGrantEligibility(grantResponse.eligibilityCriteria)
        setGrantApplication(grantResponse.applicationProcess)
        setGrantBenefits(grantResponse.benefits)
        setGrantLink(grantResponse.grantLink)        
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
            <div className="p-8 w-full">
                <div className="w-full flex justify-around items-center">
                    <div className="flex w-96 px-2 border-2 rounded-lg items-center" >
                        <SearchIcon className="w-6 h-6 mx-2 m-1" />
                        <input className="w-full p-2" type="text" placeholder="Search"></input>
                    </div>
                </div>

                <div className="mt-8 flex flex-col h-full">
                    <span className="text-2xl">Grants and Support</span>
                    <span className="text-gray-400 mb-2">View available grants to businesses of your industry</span>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>Grants & Support</Breadcrumb.Item>
                        <Breadcrumb.Item>{industrySubtype}</Breadcrumb.Item>
                        <Breadcrumb.Item>{grantName}</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="w-full bg-blue-100 mt-4 p-8 flex rounded-sm">
                        <div className="h-40 w-40">
                            <img className="object-cover h-full" src="/sg-helping.jpeg" alt="grant photo" />
                        </div>

                        <div className="flex flex-col ml-16 w-2/3">
                            <span className="text-gray-400 mt-2">{grantProvider}</span>
                            <span className="text-3xl mt-2">{grantName}</span>
                            <span className="mt-2">{grantDesc}</span>
                        </div>

                        <div className="flex items-end">
                            <Link href={grantLink}>
                                <button className=" h-8 flex items-center p-4 bg-green-400 hover:bg-green-500 rounded-lg">
                                    <span className="text-white">APPLY</span>
                                </button>
                            </Link>
                        </div>

                    </div>

                    <span className="mt-6 text-xl">Eligibility Criteria</span>
                    <span className="mt-2">{grantEligibility}</span>

                    <span className="mt-6 text-xl">Application Process</span>
                    <span className="mt-2">{grantApplication}</span>

                    <span className="mt-6 text-xl">Benefits and Disbursement</span>
                    <span className="mt-2">{grantBenefits}</span>
                </div>
            </div>
        </div>
    )
}

export default Grant

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
