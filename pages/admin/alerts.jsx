import Navbar from "../../components/admin/Navbar"
import { Form, Input, Button, Select} from 'antd';
import { useRouter } from "next/router";
import { getUser } from "../../services/userService";
import { useState, useEffect } from "react";
import { getAllIndustries, getAllIndustryNames, getIndustry } from "../../services/industryService";
import { sendNotification } from "../../services/notificationService";

function AdminDashboard (cookies) {
    const router = useRouter()
    const { Option } = Select;


    const [user, setUser] = useState()
    const [email, setEmail] = useState()

    const [selectedIndustry, setSelectedIndustry] = useState()

    const [allIndustries, setAllIndustries] = useState([])
    const [allBusinesses, setAllBusinesses] = useState([])

    async function setData() {
        if (!user) return
        setEmail(user.email)

        const industryNamesRes = await getAllIndustryNames()
        setAllIndustries(industryNamesRes)

        if (!selectedIndustry) return
        const businessArray = []
        const subIndustryRes = await getAllIndustries(selectedIndustry)

        subIndustryRes.map((element, index) => {
            const resArray = element.registeredBusinesses
            resArray.map((element, index) => {
                businessArray.push({name: element.businessName, id: element.clientId})
            })
        })
        setAllBusinesses(businessArray)        
    }

    const getAuthentication = async() => {
        try {
            const userCookie = JSON.parse(cookies.cookies.user)
            const user_data = await getUser(userCookie.user_id, userCookie.refresh_token)
            if (!user_data) router.push('/admin/login')
            if (!user) setUser(user_data)   
        }
        catch {
            router.push('/admin/login')
        }
    }
    useEffect(() => {
        getAuthentication()
        setData()
    }, [user, selectedIndustry])

    const onFinish = async (values) => {
        console.log(values);
        
        const res = await sendNotification(
            user.clientId,
            values.message,
            values.business
        )
        console.log(res)
        if (res) router.reload(window.location.pathname)
    }
    
    const onFinishFailed = (errorInfo) => {
        alert("Industry creation failed!")
    }

    
    return (
        <div className = "h-screen flex font-Inter">
            <Navbar email = {email}/>

            <div className="pt-8 pl-8 w-full">
                <div className="mt-4 mb-4 flex flex-col">
                    <div className="flex items-end">
                        <span className="text-2xl font-bold">Alert System</span>
                    </div>
                    <span className="text-gray-400">Send alerts to all businesses</span>
                </div>

                <div>
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
                        onValuesChange={(changedValues, allValues) => {
                            setSelectedIndustry(allValues.industry)
                        }}

                    >

                        <Form.Item name="industry" label="Select Industry" rules={[{ required: true }]}>
                            <Select
                                placeholder="Industry"
                            >
                                {allIndustries.map((element, index) => {
                                    return <Option key={index} value={element}>{element}</Option>
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item name="business" label="Select Business" rules={[{ required: true }]}>
                            <Select
                                placeholder="Name of Business"
                            >
                                {allBusinesses.map((element, index) => {
                                    return <Option key={index} value={element.id}>{element.name}</Option>
                                })}
                            </Select>
                        </Form.Item>


                        <Form.Item
                            label="Alert Message"
                            name="message"
                            rules={[
                            {
                                required: true,
                                message: `Please enter the alert message!`,
                            },
                            ]}
                        >
                        <Input 
                            placeholder="Message to receiver"
                        />
                        </Form.Item> <br></br>
                        <Form.Item
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit"> Send Alert</Button>
                        </Form.Item>
                    </Form>
                </div>
                

            </div>
            
        </div>
       
     )

}
    
export default AdminDashboard

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
