export default function QuickLink(task){
    return (
        <div className="flex flex-col items-baseline shadow-xl h-50 w-60 m-4 bg-gray-200 rounded-lg p-4" id="open-btn">
            <p className="order-first">{task}</p>
            {/* <p className="order-second text-2xl font-bold">{value}</p> */}
        </div>
    )
} 