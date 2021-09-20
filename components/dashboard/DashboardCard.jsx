

function DashboardCard({ header, value, link }) {
    return (
    
        <div className="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg p-4" id="open-btn">
            <p className="order-first">{header}</p>
            <p className="order-second text-2xl font-bold">{value}</p>
            <a href={link} className="no-underline hover:underline text-gray-600 pt-9">Click here for more details</a>
        </div>
    )
}

export default DashboardCard