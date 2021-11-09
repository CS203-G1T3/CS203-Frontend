import { useState, useEffect } from "react";
import { getUser } from "../../services/userService"
import { useRouter } from "next/router";
import {Table, Tooltip} from 'antd';
import {getIndustry} from '../../services/industryService';
import { getAllBusinesses } from "../../services/businessService";
import Navbar from "../../components/admin/Navbar";
import {ProfileOutlined, MessageOutlined, SearchOutlined} from '@ant-design/icons';


const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
};

function AdminBusiness( cookies ){
    
    const [user, setUser] = useState()
    const [email, setEmail] = useState()
    const [businesses, setBusinesses] = useState([])
    const [clientId, setClientId] = useState()
    const [query, setQuery] = useState();

    const { Column} = Table;
    const router = useRouter()


    async function setData() {
        if (!user) return
        setClientId(user.clientId)
        setEmail(user.email)

        const businessResponse = await getAllBusinesses();
        const businessArray = []
        for (const element of businessResponse) {
            var industry = await getIndustry(element.industryId)
            businessArray.push({key: element.businessId, business: element.businessName, desc: element.businessDesc, industry:industry.industryName, subIndustry:industry.industrySubtype})
        }

        setBusinesses(businessArray)
    }

    const getAuthentication = async() => {
        try {
            const userCookie = JSON.parse(cookies.cookies.user)
            const user_data = await getUser(userCookie.user_id, userCookie.refresh_token)
            if (!user_data) router.push('/admin/login')
            if (!user) setUser(user_data)    
        }
        catch(e) {
            console.log(e);
            router.push('/admin/login')
        }
    }
    useEffect(() => {
        getAuthentication()
        setData()
    }, [user])

    return(
        <div className= "flex min-h-screen font-Inter">
        <Navbar email = {email}/>
        <div className="p-4 w-full">
            <div className="flex flex-col">
                <span className="text-2xl font-bold mt-6 mb-2">All Businesses</span>

                <Table dataSource={businesses} rowSelection={{type: 'checkbox', ...rowSelection}} pagination = {{defaultPageSize:10}}>
                    <Column title="Business" dataIndex="business" key="business" 
                    sorter = {(a,b) => a.business.length - b.business.length} defaultSortOrder = {'ascend','descend'}/>
                    <Column title="Description" dataIndex="desc" key="desc" />
                    <Column title="Industry" dataIndex="industry" key="industry" 
                    sorter = {(a,b) => a.industry.length - b.industry.length} defaultSortOrder = {'ascend','descend'}/>
                    <Column title="Sub-Industry" dataIndex="subIndustry" key="subIndustry" />
                    <Column
                        title="Action"
                        key="action"
                        render={(record) => {
                            return (
                                <>
                                    <Tooltip placement="bottom" title= "View Risk Assessment Scores">
                                        <ProfileOutlined style={{color:'blue', fontSize:18, marginLeft:15}}/>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title= "Contact Business">
                                        <MessageOutlined style={{color:'blue', fontSize:18, marginLeft:15}}/>
                                    </Tooltip>
                                </>
                            )
                        }}          
                        />
                    </Table>
            </div>

        </div>
        
    </div>
        
        )
}
   

export default AdminBusiness

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}

