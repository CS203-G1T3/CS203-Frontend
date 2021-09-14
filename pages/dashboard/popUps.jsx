function popUps(){
    return(
        //Overlay effect
        <div className="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div
	class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
>
	<div class="mt-3 text-center">
		
		<h2 class="text-lg leading-6 font-medium text-gray-xl">Group Size: 2 Pax</h2>
        <p className="text-600">Safe Management Measures for F&B Establishments - Coffee Shops</p>
        <p className="text-blue-200">Updated: 27 JULY 2021</p>
        <p className="text-200">As hawker centers and coffeeshops are open-air and naturally ventillated spaces, a special concession would be given to allow vaccinated and unvaccinated indivuals to dine in these settings, but sibject to group sizes of up to 2 persons only.</p>
        <p className="text-gray-200">SMMs are mandated by the MOM and MTF. Click here for more details. </p>
	
		<div class="items-center px-4 py-3">
			<button
				id="read-more-btn"
				class="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-green-300"
			>
				READ MORE
			</button>
		</div>
	</div>
</div>
{/* <div
	class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100"
>
	<svg
		class="h-6 w-6 text-green-600"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M5 13l4 4L19 7"
		></path>
	</svg>
</div> */}

        </div>

        
    )
}