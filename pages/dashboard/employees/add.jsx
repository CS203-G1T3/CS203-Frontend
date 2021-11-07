import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import { SearchIcon, ChevronLeftIcon } from '@heroicons/react/solid'
import { getUser } from "../../../services/userService"
import Navbar from "../../../components/dashboard/Navbar"
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { addEmployee } from "../../../services/employeesService"


function AddEmployee(cookies) {
    const router = useRouter()
    const [user, setUser] = useState()

    const { Option } = Select;

    const onFinish = async (values) => {
        const res = await addEmployee(values.name, values.dob.format('DD/MM/YYYY'), values.vaccinationStatus, values.lastSwabDate.format('DD/MM/YYYY'), values.lastSwabResult, user.registeredBusiness.businessId)
        if (res) router.push('/dashboard/employees')
    }
    
    const onFinishFailed = (errorInfo) => {
        alert("Employee creation failed!")
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
        <div className="flex bg-gray-50 h-screen">
            <Navbar />
            <div className="p-4 w-full">
                <div className="mx-8 mt-8 flex flex-col h-full">
                    <Link href="/dashboard/employees">
                        <button className="flex items-center text-gray-500">
                            <ChevronLeftIcon className="w-4 h-4"/>
                            back to dashboard
                        </button>
                    </Link>

                    <span className="text-2xl mt-4">Add New Employee</span>

                    <div className="mt-8 w-2/3">
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            >
                            <Form.Item
                                label="Full Name"
                                name="name"
                                rules={[
                                {
                                    required: true,
                                    message: `Please input the employee's name!`,
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: `Please input the date of last swab!`, },]}>
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                name="vaccinationStatus"
                                label="Vaccination Status"
                                rules={[
                                {
                                    required: true,
                                    message: `Please input the vaccination status!`,
                                },
                                ]}
                            >
                                <Select
                                placeholder="Select an option"
                                allowClear
                                >
                                    <Option value="PFIZER">PFIZER</Option>
                                    <Option value="MODERNA">MODERNA</Option>
                                    <Option value="SINOVAC">SINOVAC</Option>
                                    <Option value="UNVACCINATED">UNVACCINATED</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="lastSwabDate" label="Date of Last Swab" rules={[{ required: true, message: `Please input the date of last swab!`, },]}>
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                name="lastSwabResult"
                                label="Result of Last Swab"
                                rules={[
                                {
                                    required: true,
                                    message: `Please input the vaccination status!`,
                                },
                                ]}
                            >
                                <Select
                                placeholder="Select an option"
                                allowClear
                                >
                                    <Option value="POSITIVE">POSITIVE</Option>
                                    <Option value="NEGATIVE">NEGATIVE</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                offset: 8,
                                span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit"> Add Employee </Button>
                            </Form.Item>
                        </Form>
                    </div>


                </div>
            </div>
        </div>    
        )
}

export default AddEmployee

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
