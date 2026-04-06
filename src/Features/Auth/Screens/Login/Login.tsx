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

    return(
        <Container>
            <h2>Login Page</h2>
            <InputFiled
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
            >
            </InputFiled>
            <InputFiled
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}   
            >
            </InputFiled>
            <ForgetButton>Forgot Password?</ForgetButton>
            <Button onClick={submitButtonHandler}>Submit</Button>
        </Container>
    )
}
export default LoginPage