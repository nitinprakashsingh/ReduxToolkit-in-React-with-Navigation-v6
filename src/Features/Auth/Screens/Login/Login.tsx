import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Container, InputFiled, ForgetButton } from "./Login.style"
import { useAppDispatch } from "../../../../Store/types"
import { loginRequest } from "../../authSlice"
import InputField from "../../components/InputFileds/EmailInput"


const LoginPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        console.log("UserName: ", userName)
        console.log("Password: ", password)
    }, [password])

    const submitButtonHandler = () => {
        dispatch((loginRequest({ email: userName, password: password })))
        navigate("/dashboard")
    }

    const forgetButtonHandler = () => {
        navigate("/forgot-password")
    }
    const signUpButtonHandler = () => {
        navigate("/signup")
    }

    return (
        <Container>
            <h2>Login Page</h2>

            <InputField
                type="email"
                placeholder="Email"
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserName(e.target.value)
                }
            />

            <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
            />
            <ForgetButton onClick={signUpButtonHandler}>Don't have an account? Sign up</ForgetButton>
            <ForgetButton onClick={forgetButtonHandler}>Forgot Password?</ForgetButton>
            <Button onClick={submitButtonHandler}>Submit</Button>
        </Container>
    )
}
export default LoginPage