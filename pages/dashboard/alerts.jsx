import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from '@heroicons/react/solid';
import { getUser } from "../../services/userService";
import Navbar from "../../components/dashboard/Navbar"
import Head from "next/head";
import { Table, Space } from 'antd';
import { getAllNotifications, getAllUnackedknowledgedNotifications, putAcknowledgeNotification } from "../../services/notificationService";


function Alerts ({ cookies }) {
    const router = useRouter()
    const { Column, ColumnGroup } = Table;


    // user states
    const [user, setUser] = useState()
    const [businessName, setBusinessName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [today, setToday] = useState(new Date())
    const [isShowAll, setIsShowAll] = useState(false)

    const [allNotifications, setAllNotifications] = useState([])
    const [allUnackNotifications, setAllUnackNotifications] = useState([])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };
    
    // this function sets all my states for this page
    async function setData() {
        if (!user) return

        setBusinessName(user.registeredBusiness.businessName)
        setClientEmail(user.email)

        const notifRes = await getAllNotifications(user.clientId)
        const notifArray = []
        notifRes.forEach((element, index) => {
            const date = new Date(element.createdAt)
            notifArray.push({key: element.notifId, message: element.messageBody, date: date.toDateString()})
        })
        setAllNotifications(notifArray)

        const unacknotifRes = await getAllUnackedknowledgedNotifications(user.clientId)
        const unackNotifArray = []
        unacknotifRes.forEach((element, index) => {
            const date = new Date(element.createdAt)
            unackNotifArray.push({key: element.notifId, message: element.messageBody, date: date.toDateString()})
        })
        setAllUnackNotifications(unackNotifArray)
        console.log(unackNotifArray);
    }

    // this function gets the current authenticated user or redirects to login if not found
    const getAuthentication = async() => {
        try {
            const userCookie = JSON.parse(cookies.user)
            const user_data = await getUser(userCookie.user_id, userCookie.refresh_token)
            if (!user_data) router.push('/login')
            if (!user) setUser(user_data)    
        }
        catch {
            router.push('/login')
        }
    }

    // this hook calls the function when the page loads and when user changes 
    useEffect(() => {
        getAuthentication()
        setData()
    }, [user])

    return (
        <div className="h-screen flex font-Inter">
            <Head>
                <title>Alerts</title>
            </Head>

            <Navbar businessName={businessName} clientEmail={clientEmail} />
            <div className="pt-8 px-8 w-full">
                <div className="w-full flex">
                    <div className="flex w-96 px-2 border-2 rounded-lg items-center" >
                        <SearchIcon className="w-6 h-6 mx-2 m-1" />
                        <input className="w-full p-2" type="text" placeholder="Search"></input>
                    </div>
                </div>

                <div className="pr-4 mt-8 flex flex-col">
                    <div className="text-2xl">Alerts and Notifications</div>
                    <div className="text-gray-400">Review and manage all alerts from the governing administrator.</div>

                    <div className="bg-red-50 rounded-lg p-4 mt-4">
                        <div>
                            <div className="text-xl">You have <span className="text-2xl font-bold">{allUnackNotifications.length}</span> alerts that require your attention.</div>
                            <div className="text-gray-600 mb-2">for {clientEmail} as of {today.toDateString()}</div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button className="bg-blue-500 text-white p-2 rounded-md self-right mb-4 w-32" 
                            onClick={() => {
                                setIsShowAll(!isShowAll)
                            }}>

                            {isShowAll ? "Recent Alerts" : "All Alerts"}
                        </button>
                        
                        {allUnackNotifications.length == 0 && !isShowAll ? 
                            <div className="text-lg">No new notifications to show</div> : 
                            <Table dataSource={isShowAll ? allNotifications : allUnackNotifications} rowSelection={{type: 'checkbox', ...rowSelection,}} pagination = {{defaultPageSize:5}}>
                                <Column title="Date" dataIndex="date" key="date" className="font-bold" />
                                <Column title="Message" dataIndex="message" key="message" className="" />

                                <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        {isShowAll ? "NA" : 
                                            <button className="text-blue-500 hover:text-blue-300" onClick={async() => {
                                                console.log(record.key);
                                                putAcknowledgeNotification(record.key)
                                                router.reload(window.location.pathname)
                                            }}>Acknowledge</button>
                                        }
                                    </Space> 
                                )}          
                                />
                            </Table>
                        }                       
                    </div>
                </div>

            </div>
            
        </div>
    )
}

// this function fetches data from the server
// we use it to return the cookies data in Dashboard function props
//put on every page that uses cookies
export const getServerSideProps = async (ctx) => {
    const { req, res } = ctx
    const {cookies} = req
    return { props: { cookies } }
}

export default Alerts

