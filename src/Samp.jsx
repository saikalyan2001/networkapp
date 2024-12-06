import { useState } from "react";
import "./Samp.css";

const userCredentials = {
    userName: "",
    Password: ""
}

export default function SignUp() {
    const [userLoginCredentials, updateUserLoginCredentials] = useState({})  //{name: sai , number:123, city: hyd}
    

    function handleCaptureData(eventObj) {
        const name = eventObj.target.name;
        const value = eventObj.target.value;

        console.log("hi", name, value)

        updateUserLoginCredentials(prev => ({

            ...prev, [name]: value    
        }))
    }

    
    function handleLpgin(){
        console.log(userLoginCredentials, "userLoginCredentials");
        
    }

    return (
        <>
        <div>
            MobileNumber
            <input type="text" name="mobilenumber"  onChange={handleCaptureData} /> 
            Password
            <input type="text" name="password"  onChange={handleCaptureData} />  
            name
            <input type="text"  />
            <button onClick={handleLpgin}>click</button>
        </div>
        </>
    )

}