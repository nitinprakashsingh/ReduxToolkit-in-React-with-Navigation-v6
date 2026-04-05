import React,{useState,useEffect, use} from "react"
import { Button, Container, InputFiled,ForgetButton } from "./Login.style"

const LoginPage = ()=>{
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    
    useEffect(()=>{
        console.log("UserName: ", userName)
        console.log("Password: ", password)
    }, [password])

    const submitButtonHandler =()=>{
        console.log("Submit Button Clicked")
    }

    return(
        <Container>
            <h2>Login Page</h2>
            <InputFiled
                type="text"
                placeholder="Username"
            >
            </InputFiled>
            <InputFiled
                type="password"
                placeholder="Password"
            >
            </InputFiled>
            <ForgetButton>Forgot Password?</ForgetButton>
            <Button onClick={submitButtonHandler}>Submit</Button>
        </Container>
    )
}
export default LoginPage