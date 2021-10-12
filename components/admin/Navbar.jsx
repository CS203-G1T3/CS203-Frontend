import Link from 'next/link'
import { AppstoreOutlined } from '@ant-design/icons'
import { SparklesIcon } from '@heroicons/react/solid'

function Navbar () {

    return (
        <div className="flex flex-col w-80">
            <Link href="/admin/dashboard">
                <button className="flex items-center p-4">
                    <SparklesIcon className="w-8 h-8"/>
                    <span className="text-indigo-700 ml-2 text-4xl font-bold">
                        TRAIL
                    </span>
                </button>
            </Link>


            <div className="flex flex-col mt-8 border-r-2 p-1 h-full">
                
                <Link href="/admin/dashboard">
                    <button className="flex items-center hover:bg-gray-200 rounded-lg p-1 w-full py-4">
                        <span className="ml-4">Overview</span>
                    </button>
                </Link>

                <Link href="/admin/guidelines">
                    <button className="flex items-center hover:bg-gray-200 rounded-lg p-1 w-full py-4">
                        <span className="ml-4">Set Operating Guidelines</span>
                    </button>
                </Link>

                <Link href="/admin/industry">
                    <button className="flex items-center hover:bg-gray-200 rounded-lg p-1 w-full py-4">
                        <span className="ml-4">View Businesses</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-gray-200 rounded-lg p-1 w-full py-4">
                        <span className="ml-4">View All Employees</span>
                    </button>
                </Link>

                <Link href="#">
                    <button className="flex items-center hover:bg-gray-200 rounded-lg p-1 w-full py-4">
                        <span className="ml-4">Analytics</span>
                    </button>
                </Link>

            </div>

        </div>
    )
}

export default Navbar