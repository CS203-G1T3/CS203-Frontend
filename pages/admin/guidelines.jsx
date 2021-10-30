import { Table, Modal,Input } from 'antd'
import { useRouter } from "next/router";
import { getUser } from "../../services/userService";
import { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar"
import GuidelineForm from "../../components/admin/GuidelineForm"
import {  getLatestGuidelineByIndustry,getAllGuidelines } from '../../services/guidelinesService';
import { getAllIndustries, getIndustry } from '../../services/industryService';
import AdminUserProfile from '../../components/admin/AdminUserProfile';
import { EyeOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { updateGuideline,deleteGuideline } from "../../services/guidelinesService"


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
    const [industry, setIndustry] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editingGuideline, setEditingGuideline] = useState(null)
    const [isViewing, setIsViewing] = useState(false)
    const [isCanOpOnSite, setIsCanOpOnSite] = useState(null)
    const [canOpOnSiteDetails, setCanOpOnSiteDetails] = useState(null)
    const [contactTracing, setContactTracing] = useState(null)
    const [contactTracingDetails, setContactTracingDetails] = useState(null)
    const [covidTestingUnvaccinated, setCovidTestingUnvaccinated] = useState(null)
    const [covidTestingVaccinated, setCovidTestingVaccinated] = useState(null)
    const [covidTestingDetails, setCovidTestingDetails] = useState(null)
    const [groupSize, setGroupSize] = useState(null)
    const [groupSizeDetails, setGroupSizeDetails] = useState(null)
    const [opCapacity, setOpCapacity] = useState(null)
    const [opCapacityDetails, setOpCapacityDetails] = useState(null)
    const [opGuidelines, setOpGuidelines] = useState(null)
    const [referenceLink, setReferenceLink] = useState(null)
    const [recordKey, setRecordKey] = useState(null)
    const [industryId, setIndustryId] = useState(null)

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
        setIndustry(editIndustry)
        setEditingGuideline(editGuideline)
    }

       

    const updateGuideline = async () => {
        const res = await updateGuideline(
            clientId,
            recordKey,
            industryId,
            isCanOpOnSite,
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
            referenceLink
        )
        console.log(res)
        if (res) router.reload(window.location.pathname)
    
        }

    

    const onViewGuideline = async (record) => {
        setIsViewing(true)

        const editGuideline = await getLatestGuidelineByIndustry(record.industryId)
        const editIndustry = await getIndustry(record.industryId)
        setIndustry(editIndustry)
        setEditingGuideline(editGuideline)
        
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
                        onOk={() => setIsViewing(false)}
                        closable={false}
                        okText = 'Got it!'
                    >
                        <div>Industry</div>
                        <Input name = "industry" value= {industry?.industryName} readOnly></Input>
                        <div>Can shops operate on site?</div>
                        <Input name = "isCanOptOnSite" value= {editingGuideline?.isCanOpOnSite}></Input>
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
                        onOk={() => setIsEditing(false) & updateGuideline()}
                    >
                            <div>Industry</div>
                            <Input name = "industry" value= {industry?.industryName} readOnly></Input>
                            <div>Can shops operate on site?</div>
                            <Input name = "isCanOptOnSite" value= {editingGuideline?.isCanOpOnSite} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setIsCanOpOnSite(e.target.value)
                                return {...pre, isCanOpOnSite : e.target.value}
                            })
                            }}></Input>
                            <div>Additional Details</div>
                            <TextArea rows={4}  value= {editingGuideline?.canOpOnSiteDetails} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setCanOpOnSiteDetails(e.target.value)
                                return {...pre, canOpOnSiteDetails : e.target.value}
                            })
                            }}/>
                            <div>Contact Tracing Measures</div>
                            <Input value= {editingGuideline?.contactTracing} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setContactTracing(e.target.value)
                                return {...pre, contactTracing : e.target.value}
                            })
                            }}></Input>
                            <div>Additional Details</div>
                            <TextArea rows={4}  value= {editingGuideline?.contactTracingDetails} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setContactTracingDetails(e.target.value)
                                return {...pre, contactTracingDetails : e.target.value}
                            })
                            }}/>
                            <div>[Vaccinated] Swab Test Every __ Day(s)</div>
                            <Input value= {editingGuideline?.covidTestingVaccinated} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setCovidTestingVaccinated(e.target.value)
                                return {...pre, covidTestingVaccinated : e.target.value}
                            })
                            }} ></Input>
                            <div>[Unvaccinated] Swab Test Every __ Day(s)</div>
                            <Input value= {editingGuideline?.covidTestingUnvaccinated} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setCovidTestingUnvaccinated(e.target.value)
                                return {...pre, covidTestingUnvaccinated : e.target.value}
                            })
                            }}></Input>
                            <div>Covid Testing Details</div>
                            <TextArea rows={4} value= {editingGuideline?.covidTestingDetails} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setCovidTestingDetails(e.target.value)
                                return {...pre, covidTestingDetails : e.target.value}
                            })
                            }}/>
                            <div>Maximum Group Size</div>
                            <Input value= {editingGuideline?.groupSize} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setGroupSize(e.target.value)
                                return {...pre, groupSize : e.target.value}
                            })
                            }}></Input>
                            <div>Additional Details</div>
                            <TextArea rows={4} value= {editingGuideline?.groupSizeDetails} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setGroupSizeDetails(e.target.value)
                                return {...pre, groupSizeDetails : e.target.value}
                            })
                            }}/>
                            <div>Maximum Operating Capacity</div>
                            <Input value= {editingGuideline?.opCapacity} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setOpCapacity(e.target.value)
                                return {...pre, opCapacity : e.target.value}
                            })
                            }}></Input>
                            <div>Additional Details</div>
                            <Input value= {editingGuideline?.opCapacityDetails} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setOpCapacityDetails(e.target.value)
                                return {...pre, opCapacityDetails : e.target.value}
                            })
                            }}></Input>
                            <div>Operating Guidelines</div>
                            <TextArea rows={4} value= {editingGuideline?.opGuidelines} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setOpGuidelines(e.target.value)
                                return {...pre, opGuidelines : e.target.value}
                            })
                            }}/>
                            <div>Reference Link</div>
                            <Input value= {editingGuideline?.referenceLink} onChange={(e) => {
                                setEditingGuideline((pre) => {
                                setReferenceLink(e.target.value)
                                return {...pre, referenceLink : e.target.value}
                            })
                            }}></Input>

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
