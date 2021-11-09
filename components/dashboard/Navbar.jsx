import Link from 'next/link'
import { AppstoreOutlined, DownOutlined } from '@ant-design/icons'
import { CodeIcon, SparklesIcon } from '@heroicons/react/solid'
import { HomeIcon, UsersIcon, HandIcon, ChatIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { Menu, Dropdown } from 'antd';

function Navbar ({businessName, clientEmail}) {

    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="#">
              User Settings
            </a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="/">
              Logout
            </a>
          </Menu.Item>
        </Menu>
    );
      

    return (
        <div className="flex flex-col max-w-80 font-Inter border-r-2 border-r-sm border-opacity-50 py-4">
            <Link href="/dashboard">
                <button className="flex items-center p-4 mx-2">
                    <CodeIcon className="w-8 h-8"/>
                    <span className="text-blue-600 ml-2 text-4xl">
                        TRAIL
                    </span>
                </button>
            </Link>

            <div className="flex flex-col h-full pr-1">
                
                <Link href="/dashboard">
                    <button className="flex items-center hover:bg-blue-100 rounded-lg p-4">
                        <HomeIcon className="ml-2 w-6" />
                        <span className="ml-4 text-left">Home</span>
                    </button>
                </Link>

                <Link href="/dashboard/employees">
                    <button className="flex items-center hover:bg-blue-100 rounded-lg p-4">
                        <UsersIcon className="ml-2 w-6" />
                        <span className="ml-4 text-left">Employees</span>
                    </button>
                </Link>

                <Link href="/dashboard/grants">
                    <button className="flex items-center hover:bg-blue-100 rounded-lg p-4">
                        <HandIcon className="ml-2 w-6" />
                        <span className="ml-4 text-left">Support</span>
                    </button>
                </Link>

                <Link href="/dashboard/alerts">
                    <button className="flex items-center hover:bg-blue-100 rounded-lg p-4">
                        <ChatIcon className="ml-2 w-6" />
                        <span className="ml-4 text-left">Alerts</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-blue-100 rounded-lg p-4">
                        <DocumentTextIcon className="ml-2 w-6" />
                        <span className="ml-4 text-left">Risk</span>
                    </button>
                </Link>

            </div>
            
            <Dropdown overlay={menu}>
                <div className="flex flex-col mt-4 p-2 items-center justify-center">
                    <div className="p-1 border-2 rounded-lg">
                        <img className="object-cover rounded-lg h-12 w-12" src="/hawker.webp" alt="profile_pic" />
                        <div className="absolute w-3 h-3 rounded-full bg-green-500 left-28 bottom-20"></div>
                    </div>
                    <div className="font-bold w-32 text-center">{ businessName }</div>
                    <div className="text-gray-400 font-bold text-xs w-32 truncate overflow-ellipsis">{ clientEmail }</div>
                </div>
            </Dropdown>
                
        </div>
    )
}

export default Navbar