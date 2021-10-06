import React,{ useState } from 'react'
import NumericInput from 'react-numeric-input'
import axios from 'axios'

function GuidelineForm() {
    const [industries, setIndustries] = useState(["Entertainment", "Office", "F&B"])

    const [state, setState] = useState({
        option: '',
    })

    const handleChange = (event) => {
        setState({option: event.target.value})
    }

    const displayIndustries = industries.map((industry, index) => {
        console.log(industry)

        return (
            <option key={index} value={industry} >{industry}</option>
        )
        
    })
 
    const addGuideline = async event => {
        event.preventDefault()

        const guideline = {
            option: state.option
        };

            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJydXdhbnNhZHJpcy4yMDIwQHNtdS5lZHUuc2ciLCJyb2xlcyI6WyJVU0VSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvbG9naW4iLCJleHAiOjE2MzM0NDEyMzV9.CHHI63tDLX2UADkOCqdK2xus8NtBjarnZTfJaZDHJ-c'

            axios.post('http://localhost:8080/api/v1/guideline/add/6ff9e0e0-23ee-4620-844f-e5809928efb8', {
              guideline
            }, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            })
            .then(res => {
                res.map(resIndx => {
                    //shallow copying
                    setIndustries(...industries, resIndx)
                })
                console.log(res)
                console.log(res.data)
            })
      }

    return(
        <form onSubmit={addGuideline} className="shadow-xl bg-purple-50 rounded-lg p-4">
            <div>
                <label>This guideline applies to (Select one industry):</label><br></br>
                <select className="border border-gray-300 rounded" name="industry" id="industry">
                    {displayIndustries}
                    {/* <option value="pls">-Please select one industry-</option>
                    <option value="fnb">F&B</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="office">Offices</option>
                    <option value="retail">Retail</option> */}
                </select>

                <label>This guideline applies to (Select one sub-industry):</label><br></br>
                <select className="border border-gray-300 rounded" name="industry" id="industry">
                    <option value="pls">-Please select one industry-</option>
                    <option value="coffeeshop">Coffeeshop</option>
                    <option value="restaurantsCafe">Restaurants/Cafe</option>
                    <option value="entertainmentI">Indoor Entertainment</option>
                    <option value="entertainmentO">Outdoor Entertainment</option>
                </select>
            </div><br></br>
            <div className="grid grid-flow-col lg:grid-cols-2 lg:grid-rows-3 gap-x-20">
                        <div>
                            <div>
                                <label htmlFor="operation">Can shops operate on site?</label><br></br>
                                <input id="operationY" type="radio" value="Yes" name="option" onChange={handleChange}/>
                                <label htmlFor="operationY"> Yes</label><br></br>
                                <input id="operationN" type="radio" value="No" name="option"/>
                                <label htmlFor="operationN"> No</label><br></br>
                            </div>
                            <div>
                                <label htmlFor="operationDetails">Additional Details</label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="operationDetails" type="text" name="operationDetails"/><br></br>
                            </div>
                        </div>
                     

                    <div>
                        <label htmlFor="contactTracing">What are the Contact Tracing measures required?</label><br></br>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="contactTracing" type="text" name="contactTracing"/><br></br>

                        <label htmlFor="contactTracingDetails">Additional Details</label><br></br>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="contactTracingDetails" type="text" name="contactTracingDetails"/><br></br>
                    </div>

                    <div>
                        <label htmlFor="swabTestV">Test frequency for the vaccinated (Every __ day(s))</label><br></br>
                        <NumericInput min={1} max={14} value={1} /><br></br>

                        <label htmlFor="swabTestUV">Test frequency for the unvaccinated (Every __ days(s))</label><br></br>
                        <NumericInput min={1} max={14} value={1} /><br></br>

                        <label htmlFor="swabTestDetails">Additional Details</label><br></br>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="swabTestDetails" type="text" name="swabTestDetails"/><br></br>
                    </div>

                    <div>
                        <label htmlFor="maxSize">Maximum Group Size</label><br></br>
                        <NumericInput min={1} max={8} value={1} /><br></br>
                        
                        <div className="mt-5">
                            <label htmlFor="maxSizeDetails">Additional Details</label><br></br>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"  id="maxSizeDetails" type="text" name="maxSizeDetails"/><br></br>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="maxCap">Maximum Operating Capacity (In percentage)</label><br></br>
                        <NumericInput min={0} max={100} value={0} /><br></br>

                        <label htmlFor="maxCapDetails">Additional Details</label><br></br>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"  id="maxCapDetails" type="text" name="maxCapDetails"/><br></br>
                    </div>

                    <div>
                        <label htmlFor="operatingGuidelines">Details on Operating Guidelines</label><br></br>
                        <input className="appearance-none block w-full h-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"  id="operatingGuidelines" type="text" name="operatingGuidelines"/><br></br>
                        
                        <div className="grid place-content-end mt-20">
                            <button className="shadow bg-indigo-700 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                SUBMIT
                            </button>
                        </div>
                    
                    </div>

                   

                   
            </div>
        </form>

        
    )
}
export default GuidelineForm