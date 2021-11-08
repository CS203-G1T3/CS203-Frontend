import { Table,Modal,Input,Form,Button,Select } from 'antd'
import { useRouter } from "next/router";
import { getUser } from "../../services/userService";
import { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar"
import GuidelineForm from "../../components/admin/GuidelineForm"
import {  getLatestGuidelineByIndustry,getAllGuidelines } from '../../services/guidelinesService';
import { getAllIndustries, getIndustry } from '../../services/industryService';
import AdminUserProfile from '../../components/admin/AdminUserProfile';
import { EyeOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { editGuideline,deleteGuideline } from "../../services/guidelinesService"

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
};

function AdminGuidelines(cookies) {
    const router = useRouter()
    const { Column } = Table;
    const { TextArea } = Input;
    const [user, setUser] = useState()
    const [clientId, setClientId] = useState()
    const [email, setEmail] = useState()
    const [guidelines, setGuidelines] = useState([])
    const [industries, setIndustries] = useState([])
    const [industry, setIndustry] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [editingGuideline, setEditingGuideline] = useState()
    const [isViewing, setIsViewing] = useState(false)
    const [canOpOnSiteDetails, setCanOpOnSiteDetails] = useState()
    const [contactTracing, setContactTracing] = useState()
    const [contactTracingDetails, setContactTracingDetails] = useState()
    const [covidTestingUnvaccinated, setCovidTestingUnvaccinated] = useState()
    const [covidTestingVaccinated, setCovidTestingVaccinated] = useState()
    const [covidTestingDetails, setCovidTestingDetails] = useState()
    const [groupSize, setGroupSize] = useState()
    const [groupSizeDetails, setGroupSizeDetails] = useState()
    const [opCapacity, setOpCapacity] = useState()
    const [opCapacityDetails, setOpCapacityDetails] = useState()
    const [opGuidelines, setOpGuidelines] = useState()
    const [referenceLink, setReferenceLink] = useState()
    const [recordKey, setRecordKey] = useState()
    const [industryId, setIndustryId] = useState()
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [isTrue, isTrueSet] = useState(false);

    const setData = async() =>  {
        if (!user) return
        setClientId(user.clientId)
        setEmail(user.email)

        // get all guidelines
        const guidelineResponse = await getAllGuidelines();
        const guidelinesArray = []
        for (const element of guidelineResponse) {
            const guidelineIndustry = await getIndustry(element.industryId)
            guidelinesArray.push({key: element.guidelineId, industry: guidelineIndustry.industryName, industryId: element.industryId, createdAt: new Date(element.createdAt).toDateString()})
        }
        setGuidelines(guidelinesArray)

        // get guidelines form data
        const industriesResponse = await getAllIndustries()
        setIndustries(industriesResponse)

    }  

    //delete guideline
    const onDeleteGuideline = (record) => {
         Modal.confirm({
            title: 'Are you sure you want to delete this guideline record?',
            okText:'Yes',
            okType:'danger',
            onOk: async () => {
                //the guideline i want to delete
                const delGuideline = await getIndustry(record.industryId)
                console.log(user.clientId)
                console.log(record.key)
                deleteGuideline(user.clientId,record.key)
                location.reload()
            }
        })
    }

    const onEditGuideline = async (record) => {
        // modal will show
        setIsEditing(true)

        //to display the current values
        const editGuideline = await getLatestGuidelineByIndustry(record.industryId)
        const editIndustry = await getIndustry(record.industryId)
        console.log("edit:" + editGuideline)
        setIndustry(editIndustry)
        setEditingGuideline(editGuideline)
        setRecordKey(record.key)
        setIndustryId(record.industryId)
        setIsCanOpOnSite(editGuideline.isCanOpOnSite)
        setCanOpOnSiteDetails(editGuideline.canOpOnSiteDetails)
        setContactTracing(editGuideline.contactTracing)
        setContactTracingDetails(editGuideline.contactTracingDetails)
        setCovidTestingDetails(editGuideline.covidTestingDetails)
        setCovidTestingUnvaccinated(editGuideline.covidTestingUnvaccinated)
        setCovidTestingVaccinated(editGuideline.covidTestingVaccinated)
        setGroupSize(editGuideline.groupSize)
        setGroupSizeDetails(editGuideline.groupSizeDetails)
        setOpCapacity(editGuideline.opCapacity)
        setOpCapacityDetails(editGuideline.opCapacityDetails)
        setOpGuidelines(editGuideline.opGuidelines)
        setReferenceLink(editGuideline.referenceLink)
    }

    const onFinish = async () => {
        const res = await editGuideline(
            clientId,
            recordKey,
            industryId,
            canOpOnSiteDetails,
            groupSize,
            groupSizeDetails,
            covidTestingUnvaccinated,
            covidTestingVaccinated,
            covidTestingDetails,
            contactTracing,
            contactTracingDetails,
            opCapacity,
            opCapacityDetails,
            opGuidelines,
            referenceLink,
            isTrue
        )
        if (res.status == 200){
            console.log(res)
            setIsSuccessful(true)
        }
    
        }

    const onFinishFailed = (errorInfo) => {
        alert("Guideline creation failed!")
    }

    const onViewGuideline = async (record) => {
        setIsViewing(true)
        const viewGuideline = await getLatestGuidelineByIndustry(record.industryId)
        const viewIndustry = await getIndustry(record.industryId)
        setIndustry(viewIndustry)
        setEditingGuideline(viewGuideline)
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
    }, [user])

    return ( 
    <div className="flex">
        <Navbar/>
      
        <div className="p-4 w-full">
           <AdminUserProfile email = {email}/>

            <div className="m-8 flex flex-col">
                <span className="text-2xl font-bold mt-8 mb-2">All Operating Guidelines</span>

                    <Table dataSource={guidelines} rowSelection={{type: 'checkbox', ...rowSelection,}} pagination = {{defaultPageSize:5}}>
                            <Column title="Industry" dataIndex="industry" key="industry" />
                            <Column title="Created At" dataIndex="createdAt" key="createdAt" />

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

                    {/* Modal to view guideline */}
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
                        <div>Can shops operate on site?</div>
                        <Input name = "isCanOpOnSite" value= {editingGuideline?.isCanOpOnSite}></Input>
                        <div>Additional Details</div>
                        <TextArea rows={4}  value= {editingGuideline?.canOpOnSiteDetails}/>
                        <div>Contact Tracing Measures</div>
                        <Input value= {editingGuideline?.contactTracing}></Input>
                        <div>Additional Details</div>
                        <TextArea rows={4}  value= {editingGuideline?.contactTracingDetails}/>
                        <div>[Vaccinated] Swab Test Every __ Day(s)</div>
                        <Input value= {editingGuideline?.covidTestingVaccinated}></Input>
                        <div>[Unvaccinated] Swab Test Every __ Day(s)</div>
                        <Input value= {editingGuideline?.covidTestingUnvaccinated}></Input>
                        <div>Covid Testing Details</div>
                        <TextArea rows={4} value= {editingGuideline?.covidTestingDetails}/>
                        <div>Maximum Group Size</div>
                        <Input value= {editingGuideline?.groupSize}></Input>
                        <div>Additional Details</div>
                        <TextArea rows={4} value= {editingGuideline?.groupSizeDetails}/>
                        <div>Maximum Operating Capacity</div>
                        <Input value= {editingGuideline?.opCapacity}></Input>
                        <div>Additional Details</div>
                        <Input value= {editingGuideline?.opCapacityDetails}></Input>
                        <div>Operating Guidelines</div>
                        <TextArea rows={4} value= {editingGuideline?.opGuidelines}/>
                        <div>Reference Link</div>
                        <Input value= {editingGuideline?.referenceLink}></Input>
                    </Modal>


                    {/* Modal to edit guideline */}
                    <Modal
                        title="Edit Guideline"
                        visible={isEditing}
                        onCancel={() => setIsEditing(false)}
                        onOk={() => setIsEditing(false)}
                        okText = 'Done!'
                    >
                        <Form name="basic"
                        labelCol={{
                            span: 7,
                        }}
                        wrapperCol={{
                            span: 10,
                        }}
                       
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off">
                            <Form.Item>
                                <div>Industry</div>
                                <Input name = "industry" value= {industry?.industryName} readOnly></Input>
                            </Form.Item>

                            <Form.Item>
                                <div>Can shops operate on site?</div>
                                <Input name = "isCanOpOnSite" value= {editingGuideline?.isCanOpOnSite} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    isTrueSet(e.target.value === 'true')
                                    return {...pre, isCanOpOnSite : e.target.value}
                                })
                                }}></Input>
                            </Form.Item>

                            <Form.Item>
                                <div>Additional Details</div>
                                <TextArea rows={4}  value= {editingGuideline?.canOpOnSiteDetails} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setCanOpOnSiteDetails(e.target.value)
                                    return {...pre, canOpOnSiteDetails : e.target.value}
                                })
                                }}/>
                            </Form.Item>

                            <Form.Item>
                                <div>Contact Tracing Measures</div>
                                <Input value= {editingGuideline?.contactTracing} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setContactTracing(e.target.value)
                                    return {...pre, contactTracing : e.target.value}
                                })
                                }}></Input>
                            </Form.Item>


                            <Form.Item>
                                <div>Additional Details</div>
                                <TextArea rows={4}  value= {editingGuideline?.contactTracingDetails} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setContactTracingDetails(e.target.value)
                                    return {...pre, contactTracingDetails : e.target.value}
                                })
                                }}/>
                            </Form.Item>

                            <Form.Item>
                                <div>[Vaccinated] Swab Test Every __ Day(s)</div>
                                <Input value= {editingGuideline?.covidTestingVaccinated} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setCovidTestingVaccinated(e.target.value)
                                    return {...pre, covidTestingVaccinated : e.target.value}
                                })
                                }} ></Input>
                            </Form.Item>

                            <Form.Item>
                                <div>[Unvaccinated] Swab Test Every __ Day(s)</div>
                                <Input value= {editingGuideline?.covidTestingUnvaccinated} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setCovidTestingUnvaccinated(e.target.value)
                                    return {...pre, covidTestingUnvaccinated : e.target.value}
                                })
                                }}></Input>
                            </Form.Item>
                            
                            <Form.Item>
                                <div>Covid Testing Details</div>
                                <TextArea rows={4} value= {editingGuideline?.covidTestingDetails} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setCovidTestingDetails(e.target.value)
                                    return {...pre, covidTestingDetails : e.target.value}
                                })
                                }}/>
                            </Form.Item>

                            <Form.Item>
                                <div>Maximum Group Size</div>
                                <Input value= {editingGuideline?.groupSize} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setGroupSize(e.target.value)
                                    return {...pre, groupSize : e.target.value}
                                })
                                }}></Input>
                            </Form.Item>

                            <Form.Item>
                                <div>Additional Details</div>
                                <TextArea rows={4} value= {editingGuideline?.groupSizeDetails} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setGroupSizeDetails(e.target.value)
                                    return {...pre, groupSizeDetails : e.target.value}
                                })
                                }}/>
                            </Form.Item>

                            <Form.Item>
                                <div>Maximum Operating Capacity</div>
                                <Input value= {editingGuideline?.opCapacity} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setOpCapacity(e.target.value)
                                    return {...pre, opCapacity : e.target.value}
                                })
                                }}></Input>
                            </Form.Item>

                            <Form.Item>
                                <div>Additional Details</div>
                                <Input value= {editingGuideline?.opCapacityDetails} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setOpCapacityDetails(e.target.value)
                                    return {...pre, opCapacityDetails : e.target.value}
                                })
                                }}></Input>
                            </Form.Item>

                            <Form.Item>
                                <div>Operating Guidelines</div>
                                <TextArea rows={4} value= {editingGuideline?.opGuidelines} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setOpGuidelines(e.target.value)
                                    return {...pre, opGuidelines : e.target.value}
                                })
                                }}/>
                            </Form.Item>
                            
                            <Form.Item>
                                <div>Reference Link</div>
                                <Input value= {editingGuideline?.referenceLink} onChange={(e) => {
                                    setEditingGuideline((pre) => {
                                    setReferenceLink(e.target.value)
                                    return {...pre, referenceLink : e.target.value}
                                })
                                }}></Input>
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
                        title="View Guideline"
                        visible={isSuccessful}
                        cancelButtonProps={{style:{display:'none'}}}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        onOk={() => setIsSuccessful(false)}
                        okText = 'Got it!'
                    >
                        Edit is successful! 
                    </Modal>


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
