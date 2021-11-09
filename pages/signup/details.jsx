import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Head from 'next/head'
import Link from 'next/link'
import { CodeIcon } from '@heroicons/react/solid'
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { getUser } from "../../services/userService"
import { getAllIndustries, getAllIndustryNames } from "../../services/industryService"
import { addBusiness } from "../../services/businessService"



function SignupDetails(cookies) {
    const router = useRouter()
    const [user, setUser] = useState()
    const { Option } = Select;


    // form states
    const [industrySelected, setIndustrySelected] = useState()
    const [industries, setIndustries] = useState([])
    const [subIndustries, setSubIndustries] = useState([])

    const onFinish = async (values) => {
        const res = await addBusiness(values.name, values.desc, values.subIndustry, user.clientId)
        if (res) router.push('/dashboard')
    }
    
    const onFinishFailed = (errorInfo) => {
        alert("sign up failed!")
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

    const setFormData = async () => {
        if (!user) return
        const industryRes = await getAllIndustryNames()
        console.log(industryRes);
        setIndustries(industryRes)

        if (!industrySelected) return
        const subIndustryRes = await getAllIndustries(industrySelected)
        setSubIndustries(subIndustryRes)
    }

    useEffect(() => {
        getAuthentication()
        setFormData()
    }, [user, industrySelected])

    return (
        <div className="flex h-screen font-Inter">
            <Head>
            <title>Sign Up</title>
            {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <div className="flex flex-col w-1/3">
                <div className="absolute flex">
                    <Link href="/">
                        <button className="flex px-16 pt-16 text-3xl items-center">
                            <CodeIcon className="h-10 mx-2 text-blue-600" />
                            TRAIL
                        </button>
                    </Link>
                </div>

                <div className="flex items-center h-full">
                    <div className="flex flex-col p-16 w-full"> 
                        <span className="text-4xl">Business Details </span>
                        <span className="py-5">Please enter your business details. Please ensure that all the information is filled in correctly.</span>

                        <Form
                            name="basic"
                            layout="vertical"
                            labelCol={{
                                span: 20,
                            }}
                            wrapperCol={{
                                span: 45,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            onValuesChange={(changedValues, allValues) => {
                                setIndustrySelected(allValues.industry)
                            }}
                            >
                            <Form.Item
                                label="Registered Business Name (ACRA)"
                                name="name"
                                rules={[
                                {
                                    required: true,
                                    message: `Please input the business name!`,
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Description of Company"
                                name="desc"
                                rules={[
                                {
                                    required: true,
                                    message: `Please input the business description!`,
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>


                            {/* <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: `Please input the date of last swab!`, },]}>
                                <DatePicker />
                            </Form.Item> */}

                            <Form.Item
                                name="industry"
                                label="Industry"
                                rules={[
                                {
                                    required: true,
                                    message: `Please input the industry!`,
                                },
                                ]}
                            >
                                <Select
                                placeholder="Select an option"
                                allowClear
                                >
                                    {industries.map((element, index) => {
                                        return <Option key={index} value={element}>{element}</Option>
                                    })}
                                </Select>
                            </Form.Item>

                            {
                                industrySelected ? 

                                    <Form.Item
                                        name="subIndustry"
                                        label="Sub-Industry / Operating License"
                                        rules={[
                                        {
                                            required: true,
                                            message: `Please input the sub industry!`,
                                        },
                                        ]}
                                    >
                                        <Select
                                        placeholder="Select an option"
                                        allowClear
                                        >
                                            {subIndustries.map((element, index) => {
                                                return <Option key={index} value={element.industryId}>{element.industrySubtype}</Option>
                                            })}

                                        </Select>
                                    </Form.Item>
                                    : ""}

                            <Form.Item
                                wrapperCol={{
                                offset: 8,
                                span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit"> Submit </Button>
                            </Form.Item>
                        </Form>


                    </div>
                </div>

            </div>


            <div className="flex">
                <div className="absolute p-4 flex flex-col h-full bg-black bg-opacity-30">  
                    <div className="p-20 flex flex-col justify-center h-full">
                        <div>
                            <span className="text-9xl text-bold text-white">trailsg.biz</span>
                        </div>
                        <span className="text-xl text-white mt-16">
                            The ultimate companion for businesses, TRAIL is a website offering support
                            for hard hit businesses during the COVID-19 pandemic. TRAIL aims to be the
                            one stop solution for your business in this challenging times. Find updated
                            guidelines, discover support and plan ahead for the future with TRAIL!
                        </span>
                    </div>
                </div>
                <img className="object-cover h-screen" src="/LHL.jpeg" alt="Log in cover" />
            </div>            
            
        </div>
    )
}

export default SignupDetails

export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}
