import axios from "axios"
import { getInMemoryToken } from "../utils/auth"

const addGuideline = async event => {
    event.preventDefault()

    const guideline = {
        option: state.option
    };


        axios.post('http://localhost:8080/api/v1/guideline/add' + userId, {
          guideline
        }, {
          headers: {
            'Authorization': `Bearer ${getInMemoryToken()}` 
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