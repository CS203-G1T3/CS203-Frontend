import { useEffect, useState } from 'react'
import NumericInput from 'react-numeric-input'
import {getUser} from '../../services/userService'
import {getAllIndustries} from '../../services/industryService'
import { Form, Input, Button, Select, InputNumber} from 'antd';
import axios from "axios"
import {setInMemoryToken} from '../../utils/auth'
import { addGuideline } from '../../services/guidelinesService';
import { useRouter } from "next/router";



function GuidelineForm({clientId, industries}) {
    const router = useRouter()


    // useEffect(() => {
    //     const fetchIndustries = async() => {
    //         const allIndustries = await getAllIndustries()
    //         setIndustries(allIndustries)  
    //         console.log(allIndustries);  
    //     }
    //     fetchIndustries()
    // },[]);


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
        const res = await addGuideline(
            clientId,
            values.industry,
            values.operate,
            values.operateDetails,
            values.groupSize,
            values.groupSizeDetails,
            values.swabTestV,
            values.swabTestU,
            values.swabTestDetails,
            values.contactTracing,
            values.contactTracingDetails,
            values.operatingCapacity,
            values.operatingCapacityDetails,
            values.operatingGuidelines,
            values.referenceLink
        )
        console.log(res)
        if (res) router.reload(window.location.pathname)
    }
    
    const onFinishFailed = (errorInfo) => {
        alert("Guideline creation failed!")
    }

    return(
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
            {industries.map((element, index) => {
                return (<Option value={element.industryId}>{element.industryName}: {element.industrySubtype}</Option>
                )})
            }
        </Select>
        </Form.Item>

        {/* <Form.Item
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
        </Form.Item> <br></br> */}

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
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
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
            name="groupSizeDetails"
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
            label="Reference Link"
            name="referenceLink"
            rules={[
            {
                required: true,
                message: `Please enter reference link!`,
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

