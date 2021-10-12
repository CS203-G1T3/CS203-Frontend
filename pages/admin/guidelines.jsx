import { SearchIcon } from '@heroicons/react/solid';
import { DownOutlined } from '@ant-design/icons';
import { Statistic, Row, Col, Button, Table, Tag, Space, Pagination} from 'antd'
import { useRouter } from "next/router";
import { getUser } from "../../services/userService";
import { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar"
import GuidelineForm from "../../components/admin/GuidelineForm"
import { getAllGuidelines } from '../../services/guidelineService';
import { getAllIndustries, getIndustry } from '../../services/industryService';

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};

function AdminGuidelines(cookies) {
    const router = useRouter()
    const { Column, ColumnGroup } = Table;

    const [user, setUser] = useState()
    const [clientId, setClientId] = useState()
    const [email, setEmail] = useState()
    const [guidelines, setGuidelines] = useState([])
    const [industries, setIndustries] = useState([])

    async function setData() {
        if (!user) return
        setClientId(user.clientId)
        setEmail(user.email)

        // get all guidelines
        const guidelineResponse = await getAllGuidelines();
        const guidelinesArray = []
        for (const element of guidelineResponse) {
            const guidelineIndustry = await getIndustry(element.industryId)
            guidelinesArray.push({key: element.guidelineId, industry: guidelineIndustry.industryName, createdAt: new Date(element.createdAt).toDateString()})
        }
        setGuidelines(guidelinesArray)

        // get guidelines form data
        const industriesResponse = await getAllIndustries()
        console.log(industriesResponse);
        setIndustries(industriesResponse)
        
    }

    const getAuthentication = async() => {
        try {
            const userCookie = JSON.parse(cookies.cookies.user)
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
    <div className="flex">
        <Navbar/>
      
        <div className="p-4 w-full">
            <div className="w-full flex justify-around items-center">
                <div className="flex w-96 p-2 px-4 border-2 rounded-full bg-gray-200" >
                    <SearchIcon className="w-6 h-6 mx-2" />
                    <input className="bg-gray-200" type="text" placeholder="Search"></input>
                </div>
                <button className="flex">
                    <div className="h-10 w-10 p-1">
                        <img className="object-cover rounded-lg h-full w-full" src="/hawker.webp" alt="profile_pic" />
                    </div>
                    <div className="flex flex-col text-left mx-2">
                        <span className="text-indigo-500 font-bold text-sm">Admin User</span>
                        <span className="text-gray-400 font-bold text-xs">{email}</span>
                    </div>
                    <DownOutlined className="w-4 pt-1"/>
                </button>
            </div>

            <div className="m-8 flex flex-col">
                <span className="text-2xl font-bold mt-8 mb-2">All Operating Guidelines</span>

                    <Table dataSource={guidelines} rowSelection={{type: 'checkbox', ...rowSelection,}} pagination = {{defaultPageSize:5}}>
                            <Column title="Industry" dataIndex="industry" key="industry" />
                            <Column title="Created At" dataIndex="createdAt" key="createdAt" />

                            <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                <button className="text-blue-500 hover:text-blue-300" onClick={async() => {
                                                                                                           router.reload(window.location.pathname
                                                                                                           )}}>View</button>
                                <button className="text-blue-500 hover:text-blue-300" onClick={async() => {
                                                                                                           router.reload(window.location.pathname
                                                                                                           )}}>Edit</button>
                                <button className="text-blue-500 hover:text-blue-300" onClick={async() => {
                                                                                                           router.reload(window.location.pathname
                                                                                                           )}}>Delete</button>
                                </Space>
                            )}          
                            />
                    </Table>

                <span className="text-2xl font-bold pb-4">Create New Guideline</span>
            
                <GuidelineForm clientId={clientId} industries={industries}/>    

            </div>

        </div>
        
    </div>
    )
}

export default AdminGuidelines

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
