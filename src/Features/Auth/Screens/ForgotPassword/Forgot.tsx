import {useState, useEffect} from "react"
import { Container } from "./Forgot.style"



const ForgotPasswordPage =()=>{
    const [email, setEmail] = useState("")

    useEffect(()=>{
        console.log("Email: ", email)
    }, [email])

    return(
        <Container>
            <h2>Forgot Password Page</h2>
        </Container>
    )

}
export default ForgotPasswordPage