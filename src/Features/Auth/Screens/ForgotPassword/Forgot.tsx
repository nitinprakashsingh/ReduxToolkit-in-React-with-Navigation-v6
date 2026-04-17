import {useState, useEffect} from "react"



const ForgotPasswordPage =()=>{
    const [email, setEmail] = useState("")

    useEffect(()=>{
        console.log("Email: ", email)
    }, [email])

    return(
        <div>
            <h2>Forgot Password Page</h2>
        </div>
    )

}
export default ForgotPasswordPage