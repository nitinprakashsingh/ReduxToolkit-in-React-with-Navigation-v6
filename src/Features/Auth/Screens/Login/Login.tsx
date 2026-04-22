import React,{useState,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { Button, Container, InputFiled,ForgetButton } from "./Login.style"
import { useAppDispatch} from "../../../../Store/types"
import { loginRequest } from "../../authSlice"


const LoginPage = ()=>{
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    
    useEffect(()=>{
        console.log("UserName: ", userName)
        console.log("Password: ", password)
    }, [password])

    const submitButtonHandler =()=>{
       dispatch((loginRequest({email: userName ,password: password})))
       navigate("/dashboard")
    }

    const forgetButtonHandler =()=>{
        navigate("/forgot-password")
    }

    return(
        <Container>
            <h2>Login Page</h2>
             <ForgetButton onClick={forgetButtonHandler}>Forgot Password?</ForgetButton>
            <Button onClick={submitButtonHandler}>Submit</Button>
        </Container>
    )
}
export default LoginPage