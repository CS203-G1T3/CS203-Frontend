import { useState, useEffect } from "react";
import { getUser } from "../../services/userService"
import { useRouter } from "next/router";
import { Form, Input, Button, Table, Space} from 'antd';
import { addIndustry, getAllIndustries } from '../../services/industryService';
import Navbar from "../../components/admin/Navbar";
import AdminUserProfile from '../../components/admin/AdminUserProfile';
import { getAllIndustryNames} from '../../services/industryService'
import { EyeOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';


const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
};

function AdminIndustry( cookies ){
    
    const [user, setUser] = useState()
    const [email, setEmail] = useState()
    const [industries, setIndustries] = useState([])
    const [industry, setIndustry] = useState()
    const [clientId, setClientId] = useState()
    const [isViewing, setIsViewing] = useState(false)


    const { Column} = Table;
    const router = useRouter()

    async function setData() {
        if (!user) return
        setClientId(user.clientId)
        setEmail(user.email)

        const industryResponse = await getAllIndustryNames();
        const industryArray = []
        for (const element of industryResponse) {
            let subIndustryResponse = await getAllIndustries(element);
            industryArray.push({key: element, industry: element, subIndustry:subIndustryResponse[0].industrySubtype})
            console.log(subIndustryResponse)
        }
        setIndustries(industryArray)
    }

    const onViewGuideline = async (record) => {
        setIsViewing(true)

        const viewIndustry = await getIndustry(record.industryId)
        setIndustry(viewIndustry)        
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

    const onFinish = async (values) => {
        const res = await addIndustry(
            user.clientId,
            values.industryName,
            values.subIndustryName,
            values.industryDesc,
        )
        console.log(res)
        if (res) router.reload(window.location.pathname)
    }
    
    const onFinishFailed = (errorInfo) => {
        alert("Industry creation failed!")
    }

    return(
        <div className="flex">
        <Navbar/>
      
        <div className="p-4 w-full">
           <AdminUserProfile email = {email}/>

            <div className="m-8 flex flex-col">
                <span className="text-2xl font-bold mt-8 mb-2">All Industries </span>

                <Table dataSource={industries} rowSelection={{type: 'checkbox', ...rowSelection}} pagination = {{defaultPageSize:5}}>
                    <Column title="Industry" dataIndex="industry" key="industry" />
                    <Column title="Sub-Industry" dataIndex="subIndustry" key="subIndustry" />

                    <Column
                        title="Action"
                        key="action"
                        render={(record) => {
                            return (
                                <>
                                    <EyeOutlined onClick = {() => {
                                        onViewGuideline(record)
                                    }}/>
                                    <EditOutlined onClick = {() => {
                                        onEditGuideline(record)
                                    }} style={{color:'blue', marginLeft:25}}/>
                                    <DeleteOutlined onClick = {() => {
                                        onDeleteGuideline(record)
                                    }} style={{color:'red', marginLeft:25}}/>
                                </>
                            )
                        }}          
                        />
                    </Table>

                    <Modal
                        title="View Guideline"
                        visible={isViewing}
                        cancelButtonProps={{style:{display:'none'}}}
                        onCancel={() => setIsViewing(false)}
                        onOk={() => setIsViewing(false)}
                        okText = 'Got it!'
                    >
                        <div>Industry</div>
                        <Input name = "industry" value= {industry?.industryName} readOnly></Input>
                        <div>Sub-Industry</div>
                        <Input name = "isCanOptOnSite" value= {industry?.industrySubtype}></Input>
                        <div>Description</div>
                        <TextArea rows={4} value = {industry?.industryDesc}/>
                        
                    </Modal>


                <span className="text-2xl font-bold pb-4">Create New Industry</span>
            
                <Form
                    name="basic"
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name of Industry"
                        name="industryName"
                        rules={[
                        {
                            required: true,
                            message: `Please enter the name of industry!`,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item> <br></br>

                    <Form.Item
                        label="Name of Sub-Industry"
                        name="subIndustryName"
                        rules={[
                        {
                            required: true,
                            message: `Please enter the name of subIndustry!`,
                        },
                        ]}
                    >
                         <Input />
                    </Form.Item> <br></br>

                    <Form.Item
                        label="Description of industry and sub-industry"
                        name="industryDesc"
                        rules={[
                        {
                            required: true,
                            message: `Please enter a description of the industry and sub-industry!`,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item> <br></br>
                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit"> Add Industry</Button>
                    </Form.Item>
                </Form>

            </div>

        </div>
        
    </div>
        
        )
}
   

export default AdminIndustry

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}

