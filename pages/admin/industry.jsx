import { useState, useEffect } from "react";
import { getUser } from "../../services/userService"
import { useRouter } from "next/router";
import { Form, Input, Button, Table, Modal, Tooltip} from 'antd';
import { addIndustry, getAllIndustries } from '../../services/industryService';
import Navbar from "../../components/admin/Navbar";
import {editIndustry, getIndustry, getAllIndustryNames} from '../../services/industryService'
import { EyeOutlined, EditOutlined, ProfileOutlined, MessageOutlined} from '@ant-design/icons';


const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
};

function AdminIndustry( cookies ){
    
    const [user, setUser] = useState()
    const [email, setEmail] = useState()
    const [industries, setIndustries] = useState([])
    // const [industry, setIndustry] = useState()
    const [industrySubtype, setIndustrySubtype] = useState()
    const [industryName, setIndustryName] = useState()
    const [business, setBusiness] = useState()
    const [industryId, setIndustryId] = useState()
    const [clientId, setClientId] = useState()
    // const [isViewing, setIsViewing] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [editingIndustry, setEditingIndustry] = useState()
    const [industryDesc, setIndustryDesc] = useState()


    const { Column} = Table;
    const router = useRouter()
    const { TextArea } = Input;


    async function setData() {
        if (!user) return
        setClientId(user.clientId)
        setEmail(user.email)

        const industryResponse = await getAllIndustryNames();
        const industryArray = []
        for (const element of industryResponse) {
            let subIndustryResponse = await getAllIndustries(element);
            industryArray.push({key: subIndustryResponse[0].industryId, industry: element, subIndustry:subIndustryResponse[0].industrySubtype, desc:subIndustryResponse[0].industryDesc })
        }
        setIndustries(industryArray)
    }


    // const onViewBusinesses = async (record) => {
    //     setIsViewing(true)

    //     const viewIndustry = await getIndustry(record.key)
    //     setIndustry(viewIndustry)
    //     setBusiness(viewIndustry.registeredBusinesses[0])      
    // }

    const onEditIndustry = async (record) => {
        // modal will show
       setIsEditing(true)

        //to display the current values
       const editIndustry = await getIndustry(record.key)
        setIndustryId(record.key)
        setEditingIndustry(editIndustry)
        setIndustryName(editIndustry.industryName)
        setIndustrySubtype(editIndustry.industrySubtype)
        setIndustryDesc(editIndustry.industryDesc)
       
    }

    const onFinishEdit = async () => {
        console.log("industry:" + clientId)
        console.log("industry:" + industryId)

        const res = await editIndustry(
            clientId,
            industryId,
            industryName,
            industrySubtype,
            industryDesc
        )
        if (res.status == 200){
            console.log(res)
            setIsSuccessful(true)
            setData()

        }
    
    }

    const onFinishEditFailed = (errorInfo) => {
        alert("Industry edit failed!")
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
            values.subIndustry,
            values.industryDesc,
        )
        console.log(res)
        if (res) router.reload(window.location.pathname)
    }
    
    const onFinishFailed = (errorInfo) => {
        alert("Industry creation failed!")
    }

    return(
        <div className= "flex min-h-screen font-Inter">
        <Navbar email = {email}/>
        <div className="p-4 w-full">
            <div className="flex flex-col">
                <span className="text-2xl font-bold mt-6 mb-2">All Industries </span>

                <Table dataSource={industries} rowSelection={{type: 'checkbox', ...rowSelection}} pagination = {{defaultPageSize:5}}>
                    <Column title="Industry" dataIndex="industry" key="industry" />
                    <Column title="Sub-Industry" dataIndex="subIndustry" key="subIndustry" />
                    <Column title="Description" dataIndex="desc" key="desc" />
                    <Column
                        title="Action"
                        key="action"
                        render={(record) => {
                            return (
                                <>
                                    {/* <Tooltip placement="bottom" title= "View Businesses In This Industry">
                                        <EyeOutlined onClick = {() => {
                                            onViewBusinesses(record)
                                        }}/>
                                    </Tooltip> */}

                                    <Tooltip placement="bottom" title= "Edit Industry Description">
                                        <EditOutlined onClick = {() => {
                                            onEditIndustry(record)
                                        }} style={{color:'blue', marginLeft:25}}/>
                                     </Tooltip>
                                
                                </>
                            )
                        }}          
                        />
                    </Table>

                    {/* <Modal
                        title="View Businesses In This Industry"
                        visible={isViewing}
                        cancelButtonProps={{style:{display:'none'}}}
                        onCancel={() => setIsViewing(false)}
                        onOk={() => setIsViewing(false)}
                        okText = 'Got it!'
                    >
                        <div>Industry</div>
                        <Input name = "industry" value= {industry?.industryName} readOnly></Input>
                        <div className="flex mt-5">
                            <div>Business </div>
                            <div><Tooltip placement="bottom" title= "View Risk Assessment Scores"><ProfileOutlined style={{color:'blue', fontSize:18, marginLeft:15}}/></Tooltip></div>
                            <div><Tooltip placement="bottom" title= "Contact Business"><MessageOutlined style={{color:'blue', fontSize:18, marginLeft:15}}/></Tooltip></div>
                        </div>
                        <Input name = "industrySubtype" value= {business?.businessName} readOnly></Input>
                        <div>Description</div>
                        <TextArea rows={4} value = {business?.businessDesc} readOnly/>


                        
                    </Modal> */}

                     {/* Modal to edit industry */}
                     <Modal
                        title="Edit Guideline"
                        visible={isEditing}
                        onCancel={() => setIsEditing(false)}
                        onOk={() => setIsEditing(false)}
                        okText = 'Done!'
                    >
                        <Form name="editIndustry"
                        labelCol={{
                            span: 7,
                        }}
                        wrapperCol={{
                            span: 10,
                        }}
                       
                        onFinish={onFinishEdit}
                        onFinishFailed={onFinishEditFailed}
                        autoComplete="off">
                            <Form.Item>
                                <div>Industry</div>
                                <Input name = "industry" value= {editingIndustry?.industryName} readOnly></Input>
                            </Form.Item>

                            <Form.Item>
                                <div>Sub-Industry</div>
                                <Input name = "subIndustry" value= {editingIndustry?.industrySubtype} readOnly></Input>
                            </Form.Item>

                            <Form.Item>
                                <div>Description</div>
                                <TextArea rows={4} value= {editingIndustry?.industryDesc} onChange={(e) => {
                                    setEditingIndustry((pre) => {
                                    setIndustryDesc(e.target.value)
                                    return {...pre, industryDesc : e.target.value}
                                })
                                }}/>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                offset: 8,
                                span: 16,
                                }}
                                >
                                <Button type="primary" htmlType="submit"> Confirm Edit</Button>
                            </Form.Item>

                        </Form>

                    </Modal>

                    {/* Modal to tell user if edit was successful*/} 
                    <Modal
                        title="Edit Industry"
                        visible={isSuccessful}
                        cancelButtonProps={{style:{display:'none'}}}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        onOk={() => setIsSuccessful(false)}
                        okText = 'Got it!'
                    >
                        Edit is successful! 
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

