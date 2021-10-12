import React,{ useEffect, useState } from 'react'
import NumericInput from 'react-numeric-input'
import {getUser} from '../../services/userService'
import {getAllIndustries} from '../../services/industryService'
import { Form, Input, Button, Select, InputNumber} from 'antd';
import axios from "axios"
import {setInMemoryToken} from '../../utils/auth'


function GuidelineForm() {
    const[industries, setIndustries] = useState()
    console.log(industries)


    // function displayIndustries() {
    //     industries.map((industry, index) => {
    //         return (
    //             <option key={index} value={industry}>{industry}</option>
    //         )
    //     })
    // }

    async function setData() {
        const allIndustries = await getAllIndustries()
        setIndustries(allIndustries)
    }

    useEffect(() => {
        setData()
    },[])


    const [state, setState] = useState({
        option: '',
    })

    const handleChange = (event) => {
        setState({option: event.target.value})
    }
    
    const { Option } = Select;

    function onChange(value) {
    console.log(`selected ${value}`);
    }

    const onFinish = async (values) => {
        const res = await addEmployee(values.name, values.dob.format('DD/MM/YYYY'), values.vaccinationStatus, values.lastSwabDate.format('DD/MM/YYYY'), values.lastSwabResult, user.registeredBusiness.businessId)
        if (res) router.push('/dashboard/employees')
    }
    
    const onFinishFailed = (errorInfo) => {
        alert("Guideline creation failed!")
    }




    
      

    return(
        <Form
        name="basic"
        labelCol={{
            span: 5,
        }}
        wrapperCol={{
            span: 5,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
            label="Please select one industry"
            name="industry"
            rules={[
            {
                required: true,
                message: `Please select one industry!`,
            },
            ]}
        >
        <Select
            style={{ width: 200 }}
            placeholder="Select an industry"
            onChange={onChange} 
        >
            <Option value="fnb">F&B</Option>
            <Option value="entertainment">Entertainment</Option>
            <Option value="retail">Retail</Option>
            <Option value="office">Office</Option>
        </Select>
        </Form.Item>

        <Form.Item
            label="Please select one sub-industry (if applicable)"
            name="subIndustry"
        >
        <Select
            style={{ width: 200 }}
            placeholder="Select a sub-industry"
            onChange={onChange} 
        >
            <Option value="hawker">Hawker</Option>
            <Option value="restaurantsncafe">Restaurant/Cafe</Option>
            <Option value="indoor">Indoor Entertainment</Option>
            <Option value="outdoor">Outdoor Entertainment</Option>
        </Select>
        </Form.Item> <br></br>

        <Form.Item
            label="Can shops operate on site?"
            name="operate"
            rules={[
                {
                    required: true,
                    message: `Please select one industry!`,
                },
            ]}
        >
        <Select
            style={{ width: 200 }}
            placeholder="Select an option"
            onChange={onChange} 
        >
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
        </Select>
        </Form.Item>

        <Form.Item
            label="Additional Details"
            name="operateDetails"
            rules={[
            {
                required: true,
                message: `Please enter details!`,
            },
            ]}
        >
        <Input />
        </Form.Item> <br></br>


        <Form.Item
            label="Contact Tracing Measures"
            name="contactTracing"
            rules={[
            {
                required: true,
                message: `Please enter Contact Tracing Measures!`,
            },
            ]}
        >
        <Input />
        </Form.Item> 

        <Form.Item
            label="Additional Details"
            name="contactTracingDetails"
            rules={[
            {
                required: true,
                message: `Please enter details!`,
            },
            ]}
        >
        <Input />
        </Form.Item> <br></br>


        <Form.Item
            label="[Vaccinated] Swab Test Every __ Day(s)"
            name="swabTestV"
            rules={[
            {
                required: true,
                message: `Please enter/select a number!`,
            },
            ]}
        >
        <InputNumber min={1} max={31} defaultValue={7} onChange={onChange} />
        </Form.Item> 

        <Form.Item
            label="[Unvaccinated] Swab Test Every __ Day(s)"
            name="swabTestU"
            rules={[
            {
                required: true,
                message: `Please enter/select a number!`,
            },
            ]}
        >
        <InputNumber min={1} max={31} defaultValue={7} onChange={onChange} />
        </Form.Item> 

        <Form.Item
            label="Additional Details"
            name="swabTestDetails"
            rules={[
            {
                required: true,
                message: `Please enter details!`,
            },
            ]}
        >
        <Input />
        </Form.Item> <br></br>

        <Form.Item
            label="Maximum Group Size"
            name="groupSize"
            rules={[
            {
                required: true,
                message: `Please enter/select a number!`,
            },
            ]}
        >
        <InputNumber min={1} max={10} defaultValue={2} onChange={onChange} />
        </Form.Item> 

        <Form.Item
            label="Additional Details"
            name="swabTestDetails"
            rules={[
            {
                required: true,
                message: `Please enter details!`,
            },
            ]}
        >
        <Input />
        </Form.Item> <br></br>


        <Form.Item
            label="Maximum Operating Capacity"
            name="operatingCapacity"
            rules={[
            {
                required: true,
                message: `Please enter/select a number!`,
            },
            ]}
        >
        <InputNumber min={1} max={100} defaultValue={50} onChange={onChange} />
        </Form.Item> 

        <Form.Item
            label="Additional Details"
            name="operatingCapacityDetails"
            rules={[
            {
                required: true,
                message: `Please enter details!`,
            },
            ]}
        >
        <Input />
        </Form.Item> <br></br>

        <Form.Item
            label="Operating Guidelines"
            name="operatingGuidelines"
            rules={[
            {
                required: true,
                message: `Please enter guidelines!`,
            },
            ]}
        >
        <Input />
        </Form.Item> 

        <Form.Item
            wrapperCol={{
            offset: 8,
            span: 16,
            }}
        >
            <Button type="primary" htmlType="submit"> Add Guideline</Button>
        </Form.Item>







        </Form>




    
)
}
export default GuidelineForm

